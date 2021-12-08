import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configFile from "../config/config.json";

const axiosInstance = axios.create({
    baseURL: configFile.API_END_POINT,
    withCredentiials: true,
});

axiosInstance.interceptors.request.use(
    function (config) {
        config.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
            configFile.TOKEN_ACCESS_KEY
        )}`;
        config.headers.post["Content-Type"] = "application/json";
        config.headers.get["Content-Type"] = "application/json";
        console.log("config", config);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

//  перехватчик, 1й аргумент  - положительный ответ, 2 - error(unexpected)
axiosInstance.interceptors.response.use(
    (res) => {
        // if (configFile.isFireBase) {
        //     res.data = { content: transformData(res.data) };
        // }
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
            toast.error("some error happened");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axiosInstance.get,
    post: axiosInstance.post,
    put: axiosInstance.put,
    delete: axiosInstance.delete,
};

export default httpService;
