import { UserRole } from "../../enums/role.enum"

export interface UserDetailEntity {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    userRoles: UserRole[]
    createdAt: Date,
}

export interface AuthResponseEntity {
    token: string,
    refreshToken: string
}


export interface JwtTokenEntity {
    user_id: number,
    email: string,
    role: string[] | string
}