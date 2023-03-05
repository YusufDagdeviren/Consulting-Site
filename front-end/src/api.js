import axios from "axios";

const fetchUserList = async() => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/users`)
    return data;
}
const fetchUserDetail = async(id) => {
    const { data } = await  axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/users/${id}`)
    return data
}
const fetchRegister = async(input) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/register`,input);
    return data
}
const fetchLogin = async(input) => {
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/login`,input);
    return data
}
const fetchMe = async() =>{
    const config = {
        headers: {
            Authorization: 'Bearer '+ localStorage.getItem("token")
        }
    };
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/whoami`,config)
    return data
}
const fetchComment = async (id,input) => {
    const config = {
        headers: {
            Authorization: 'Bearer '+ localStorage.getItem("token")
        }
    };
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/users/${id}/comments`,input,config);
    return data;
}
export{
    fetchUserList,
    fetchUserDetail,
    fetchRegister,
    fetchLogin,
    fetchMe,
    fetchComment
}