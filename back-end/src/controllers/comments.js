const User = require('../models/Users')

const createAnswer = (res, status, content) => {
    res
        .status(status)
        .json(content)
}
const postComment = (req, res) => {
    //Block 1
    if (req.auth && req.auth.email) {
        User
            .findOne({ email: req.auth.email })
            .exec((error, user) => {
                if (!user) {
                    createAnswer(res, 404, { "error": "User not found" })
                } else if (error) {
                    createAnswer(res, 400, error);
                } else {
                    //Block 2
                    const userid = req.params.userid;
                    if (userid && userid != req.auth._id) {
                        User
                            .findById(userid)
                            .select("comments")
                            .exec((error, content) => {
                                if (error) {
                                    createAnswer(res, 400, error)
                                } else {
                                    if (!content) {
                                        createAnswer(res, 404, { "error": "user has not found" })
                                    } else {
                                        content.comments.push({
                                            commenterEmail: user.email,
                                            commentText: req.body.commentText,
                                            commentDate: Date.now(),
                                        });
                                        content.save((error, content) => {
                                            var comment;
                                            if (error) {
                                                createAnswer(res, 400, error);
                                            } else {
                                                comment = content.comments[content.comments.length - 1]
                                                createAnswer(res, 201, comment)
                                            }
                                        })
                                    }
                                }
                            })
                    } else {
                        createAnswer(res, 404, { "error": "userid must be entered and You cannot comment on your own." })
                    }
                }
            })
    } else {
        createAnswer(res, 404, { "error": "No auth" })
    }

}
const getComment = (req, res) => {
    if (req.params && req.params.userid && req.params.commentid) {
        User.findById(req.params.userid)
            .select("name comments")
            .exec((error, content) => {
                let response, comment;
                if (!content) {
                    createAnswer(res, 404, { "error": "User is not found" })
                    return
                }
                else if (error) {
                    createAnswer(res, 400, error);
                }
                if (content.comments && content.comments.length > 0) {
                    comment = content.comments.id(req.params.commentid);
                    if (!comment) {
                        createAnswer(res, 404, { "error": "Comment is not found" });
                    } else {
                        response = {
                            user: {
                                name: content.name,
                                id: req.params.userid,
                            },
                            comment: comment
                        };
                        createAnswer(res, 200, response)
                    }
                } else {
                    createAnswer(res, 404, { "error": "no comments" })
                }

            })
    }
    else {
        createAnswer(res, 404, { "error": "userid and commentid must be entered" })
    }
}
const updateComment = (req, res) => {
    const userid = req.params.userid;
    const commentid = req.params.commentid;
    if (!userid || !commentid) {
        createAnswer(res, 404, { "error": "userid and commentid not found" })
        return
    }
    else {
        User
            .findById(userid)
            .select("comments")
            .exec((error, content) => {
                var comment;
                if (error) {
                    createAnswer(res, 400, error)
                } else {
                    if (!content) {
                        createAnswer(res, 404, { "error": "user has not found" })
                    } else {
                        if (content.comments && content.comments.length > 0) {
                            comment = content.comments.id(commentid)
                            if (!comment) {
                                createAnswer(res, 404, { "error": "No related comments found." })
                            } else {
                                if (req.auth.email === comment.commenterEmail) {
                                    comment.commentText = req.body.commentText;
                                    comment.commentDate = Date.now()
                                    content.save((error2, content2) => {
                                        if (error2) {
                                            createAnswer(res, 404, error2)
                                        } else {
                                            createAnswer(res, 201, content2)
                                        }
                                    })
                                } else {
                                    createAnswer(res, 401, { "error": "unauthorized action" });
                                }
                            }
                        } else {
                            createAnswer(res, 404, { "error": "no comments found" });
                        }
                    }
                }
            })
    }
}
const deleteComment = (req, res) => {
    const userid = req.params.userid;
    const commentid = req.params.commentid;
    if (!userid || !commentid) {
        createAnswer(res, 404, { "error": "User id or comment id has not found" })
        return;
    } else {
        User
            .findById(userid)
            .select("comments")
            .exec((error, content) => {
                if (error) {
                    createAnswer(res, 400, error)
                } else {
                    if (!content) {
                        createAnswer(res, 404, { "error": "user has not found" })
                        return;
                    } else {
                        if (content.comments && content.comments.length > 0) {
                            if (!content.comments.id(commentid)) {
                                createAnswer(res, 404, { "error": "comment has not found" })
                            } else {
                                let comment = content.comments.id(commentid);
                                if (comment.commenterEmail === req.auth.email || req.auth.authority==="admin") {
                                    content.comments.id(commentid).remove();
                                    content.save((error2, content2) => {
                                        if (error2) {
                                            createAnswer(res, 400, error2)
                                        } else {
                                            createAnswer(res, 200, { "state": "Delete comment", "Deleted comment is": `${content2}` })
                                        }
                                    })
                                }else{
                                    createAnswer(res,401,{"error":"Unauthorized action"})
                                }

                            }
                        }
                    }
                }
            })
    }
}

module.exports = {
    postComment,
    getComment,
    updateComment,
    deleteComment
}