export interface RegisterUserCommand {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export interface LoginUserCommand {
    email: string,
    password: string,
}