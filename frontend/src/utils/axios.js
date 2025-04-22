import axios from "axios";

const AxiosInstance = axios.create({
    baseURL:"http://localhost:8050/niyaba",
    withCredentials:true
})

export default AxiosInstance;