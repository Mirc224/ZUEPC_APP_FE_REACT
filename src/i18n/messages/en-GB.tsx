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
            
            // Validation
            isRequiredIt: "{{what}} is required",
            isRequiredHe: "{{what}} is required",
            minLength: "{{what}} should be of minimum {{len}} characters length",
            enterValid: "Enter valid {{what}}",
            passwordMatch: "Passwords must match",
            invalidEmailOrPassword: "The email or password is incorrect",
            emailAlreadyUsed: "Email already used",

            // Endpoints
            users: "Users",
            publications: "Publications",
            persons: "Persons",
            institutions: "Institutions",
            login: "Log In",
            register: "Register",
            logout: "Log Out",

            // Messages
            logoutMessage: "You have been logged out",
            missingMessage: "Page does not exist",
            unauthorized: "Unauthorized",

            // Controls
            rowsPerPage: "Rows per page",

            // Page headers
            user: "User",
            userList: "User list"
        }
    }
}

export default lan;