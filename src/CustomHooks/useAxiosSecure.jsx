import axios from "axios";

// http://localhost:5000
// https://ph-assingment-12-only-tech-server.vercel.app/
// const BASE_URL = "http://localhost:5000";
 const BASE_URL = "https://ph-assingment-12-only-tech-server.vercel.app";

const axiosSecure = axios.create({
    baseURL : BASE_URL,
    withCredentials: true
});

const useAxiosSecure = () => {
    return axiosSecure;
};
export default useAxiosSecure;