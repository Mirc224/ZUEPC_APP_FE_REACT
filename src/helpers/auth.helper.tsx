import jwt_decode from "jwt-decode";
import { UserAuthContent } from "../contexts/AuthContext";
import authStorageNames  from '../constatns/auth.constants'
import { ApiAuthResponse } from "../types/api/auth/entities.types";
import { ApiJwtToken } from "../types/entities/auth/entities.types";

export const authHelper = {
    getUserAuthToken,
    storeRefreshToken,
    getRefreshToken,
    storeAccessToken,
    getAccessToken
};

function getUserAuthToken(authResponse: ApiAuthResponse): UserAuthContent {
    const decodedToken = jwt_decode(authResponse.token) as ApiJwtToken;
    const roles = ([] as string[]).concat(decodedToken.role);
    return {
        id: decodedToken.user_id,
        email: decodedToken.email,
        roles: roles,
        token: authResponse.token,
        refreshToken: authResponse.refreshToken
    } as UserAuthContent;
}

function storeRefreshToken(refreshToken: string | undefined) {
    if(refreshToken)
    {
        localStorage.setItem(authStorageNames.refreshToken, refreshToken);
    }
}

function getRefreshToken(): string | null {
    return localStorage.getItem(authStorageNames.refreshToken)
}

function storeAccessToken(accessToken: string | undefined) {
    if (accessToken) {
        localStorage.setItem(authStorageNames.jwtToken, accessToken);
    }
}

function getAccessToken(): string | null {
    return localStorage.getItem(authStorageNames.jwtToken)
}