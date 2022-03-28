import jwt_decode from "jwt-decode";
import { UserAuthContent } from "../contexts/AuthContext";
import authStorageNames  from '../constatns/auth.constants'
import { AuthResponseEntity, JwtTokenEntity } from "../types/auth/entities.types";

export const authHelper = {
    getUserAuthToken,
    storeRefreshToken,
    getRefreshToken,
    storeAccessToken,
    getAccessToken
};

function getUserAuthToken(authResponse: AuthResponseEntity): UserAuthContent {
    const decodedToken = jwt_decode(authResponse.token) as JwtTokenEntity;
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