import { UserRole } from "../../../enums/role.enum"

export interface ApiUserDetail {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    userRoles: UserRole[]
    createdAt: Date,
}

export interface ApiAuthResponse {
    token: string,
    refreshToken: string
}
