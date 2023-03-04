import axios from "axios";
axios.interceptors.request.use(
    //istek gönderilmeden önce yapılacaklar
    function (config) {
        const { origin } = new URL(config.url);
        const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT]
        const token = localStorage.getItem("token")
        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
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
export{
    fetchUserList,
    fetchUserDetail,
    fetchRegister,
    fetchLogin
}