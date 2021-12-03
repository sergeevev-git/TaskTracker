import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import configFile from "../config/config.json";

// axios.defaults.baseURL = configFile.apiEndPoint;

axios.interceptors.request.use(
    function (config) {
        console.log("config", config);
        // if (configFile.isFireBase) {
        //     const containSlash = /\/$/gi.test(config.url);
        //     config.url =
        //         (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
        // }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// function transformData(data) {
//     return data
//         ? Object.keys(data).map((key) => ({
//               ...data[key],
//           }))
//         : [];
// }

//  перехватчик, 1й аргумент  - положительный ответ, 2 - error(unexpected)
axios.interceptors.response.use(
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
            error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
            toast.error("some error happened");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};

export default httpService;