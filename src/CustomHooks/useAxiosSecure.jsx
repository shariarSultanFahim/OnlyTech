import axios from "axios";

// http://localhost:5000
// https://tidder-server.vercel.app
const BASE_URL = "http://localhost:5000";

const axiosSecure = axios.create({
    baseURL : BASE_URL,
    withCredentials: true
});

const useAxiosSecure = () => {
    return axiosSecure;
};
export default useAxiosSecure;