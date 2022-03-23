export interface AuthResponse {
    token: string,
    refreshToken: string
}

export interface NewUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export interface LoginData {
    email: string,
    password: string,
}

export interface ApiJwtToken {
    user_id: number,
    email: string,
    role: string[] | string
}

export interface ApiUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    roles: string[]
}

export interface ApiAuthResponse {
    token: string,
    refreshToken: string
}