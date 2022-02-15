import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "users/";

const userService = {
    // get: async () => {
    //     const { data } = await httpService.get(userEndPoint);
    //     return data;
    // },

    // create: async (payload) => {
    //     const { data } = await httpService.put(userEndPoint + payload._id, payload);

    //     return data;
    // },
    getCurrentUser: async () => {
        const userId = localStorageService.getUserId();
        const { data } = await httpService.get(
            // userEndPoint + localStorageService.getUserId(),
            userEndPoint,
            {
                params: { userId },
            }
        );
        console.log("getCurrentUser", data);

        return data;
    },
};

export default userService;
