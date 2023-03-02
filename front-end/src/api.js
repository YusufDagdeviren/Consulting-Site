import axios from "axios";
const fetchUserList = async() => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/users`)
    return data;
}
export{
    fetchUserList,
}