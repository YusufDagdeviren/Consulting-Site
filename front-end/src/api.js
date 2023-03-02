import axios from "axios";
const fetchUserList = async() => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/users`)
    return data;
}
const fetchUserDetail = async(id) => {
    const { data } = await  axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/users/${id}`)
    return data
}
export{
    fetchUserList,
    fetchUserDetail
}