import axios from "axios";
const setAuth = () => {
    const config = {
        headers: {
            Authorization: 'Bearer '+ localStorage.getItem("token")
        }
    };
    return config
}
const fetchUserList = async({ pageParam = 0 }) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/users?page=${pageParam}`)
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
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/whoami`,setAuth())
    return data
}
const fetchComment = async (id,input) => { 
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/users/${id}/comments`,input,setAuth());
    return data;
}
const fetchUpdateUser = async (id,input) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_ENDPOINT}/users/${id}`,input,setAuth())
    return data;
}
const fetchDeleteUser = async (id) =>{
    const { data } = await axios.delete(`${process.env.REACT_APP_BASE_ENDPOINT}/users/${id}`,setAuth())
    return data;
}
export{
    fetchUserList,
    fetchUserDetail,
    fetchRegister,
    fetchLogin,
    fetchMe,
    fetchComment,
    fetchUpdateUser,
    fetchDeleteUser
}