import configFile from "../config/config.json";

export function setTokens(accessToken) {
    //   время смерти токена
    // const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(configFile.TOKEN_ACCESS_KEY, accessToken);
    // localStorage.setItem(TOKEN_REFRESH_KEY, refreshToken);
    // localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function removeTokens() {
    localStorage.removeItem(configFile.TOKEN_ACCESS_KEY);
    // localStorage.removeItem(TOKEN_REFRESH_KEY);
    // localStorage.removeItem(EXPIRES_KEY);
}

export function getAccessToken() {
    return localStorage.getItem(configFile.TOKEN_ACCESS_KEY);
}

// export function getRefreshToken() {
//     return localStorage.getItem(TOKEN_REFRESH_KEY);
// }

// export function getTokenExpiresDate() {
//     return localStorage.getItem(EXPIRES_KEY);
// }

const localStorageService = {
    setTokens,
    removeTokens,
    getAccessToken,
    // getRefreshToken,
    // getTokenExpiresDate,
};

export default localStorageService;
