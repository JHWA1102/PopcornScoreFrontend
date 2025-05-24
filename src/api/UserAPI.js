import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

const BASE_URL = 'http://localhost:8080';

/** 회원조회 API */
export const fetchUser = async () => {
    const response = await UserApi.get(`/api/v1/user`);
    return response.data;
}

/** 회원수정 API */
export const updateUser = async (data) => {
    const response = await UserApi.put(`/api/v1/user`, data);
    return response.data;
}

/** 회원탈퇴 API */
export const deleteUser = async () => {
    await UserApi.delete(`/api/v1/user`);
}

/** CREATE CUSTOM AXIOS INSTANCE */
export const UserApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'REFRESH_TOKEN': REFRESH_TOKEN,
    },
});

// 토큰 갱신
const refreshAccessToken = async () => {
    const response = await UserApi.get(`/api/v1/auth/refresh`);
    ACCESS_TOKEN = response.data;
    localStorage.setItem('accessToken', ACCESS_TOKEN);
    UserApi.defaults.headers.common['Authorization'] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
}

// 응답 인터셉터: 토큰 만료 시 자동 갱신 후 재요청
UserApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.get(`${BASE_URL}/api/v1/auth/refresh`, {
                    headers: {
                        'REFRESH_TOKEN': localStorage.getItem("refreshToken")
                    }
                });

                const newAccessToken = response.data;
                localStorage.setItem('accessToken', newAccessToken);

                // 헤더 업데이트 후 재요청
                originalRequest.headers['Authorization'] = `${localStorage.getItem("tokenType") || 'Bearer'} ${newAccessToken}`;
                return UserApi(originalRequest);
            } catch (refreshError) {
                console.error("토큰 갱신 실패", refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// 요청 인터셉터: 항상 최신 토큰 사용
UserApi.interceptors.request.use(
    (config) => {
        const tokenType = localStorage.getItem("tokenType") || 'Bearer';
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (accessToken) {
            config.headers['Authorization'] = `${tokenType} ${accessToken}`;
        }
        if (refreshToken) {
            config.headers['REFRESH_TOKEN'] = refreshToken;
        }

        return config;
    },
    (error) => Promise.reject(error)
);