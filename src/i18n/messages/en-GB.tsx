import { LOCALES } from "../locales"

const lan =  {
    [LOCALES.ENGLISH]: {
        translation: {
            // Registration fields
            registration: "Registration",
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email",
            password: "Password",
            passwordConfirmation: "Password Confirmation",
            submit: "Submit",
            search: "Search",
            
            // Validation
            isRequiredIt: "{{what}} is required",
            isRequiredHe: "{{what}} is required",
            minLength: "{{what}} should be of minimum {{len}} characters length",
            enterValid: "Enter valid {{what}}",
            passwordMatch: "Passwords must match",
            invalidEmailOrPassword: "The email or password is incorrect",
            emailAlreadyUsed: "Email already used",

            // Search field
            nameAndSurnameSearch: "Name and surname",


            // Endpoints
            users: "Users",
            publications: "Publications",
            persons: "Persons",
            institutions: "Institutions",
            login: "Log In",
            register: "Register",
            logout: "Log Out",

            // Roles
            user: 'User',
            editor: 'Editor',
            admin: 'Admin',

            // Messages
            logoutMessage: "You have been logged out",
            missingMessage: "Page does not exist",
            unauthorized: "Unauthorized",

            // Controls
            rowsPerPage: "Rows per page",

            // Page headers
            editPage: "Edit",
            userPage: "User",
            userList: "User list",

            roles: "Roles",

        }
    }
}

export default lan;