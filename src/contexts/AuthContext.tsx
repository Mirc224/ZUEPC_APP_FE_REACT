import { createContext, useContext } from "react";

type AuthContent = {
    auth: UserAuthContent,
    setAuth: any
}

export interface UserAuthContent {
    id?: number,
    email?: string,
    token?: string,
    refreshToken?: string,
    roles?: string[]
}

export const AuthContext = createContext<AuthContent>(undefined!);
