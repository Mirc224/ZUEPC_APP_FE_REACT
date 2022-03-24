import { UserRole } from "../../../enums/role.enum"

export interface UpdateUserCommand {
    firstName: string,
    lastName: string
}

export interface UpdateUserRolesCommand {
    rolesToInsert: UserRole[],
    rolesToDelete: UserRole[]
}