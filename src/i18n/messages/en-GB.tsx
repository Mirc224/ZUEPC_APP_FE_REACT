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
            mustBeNumber: "{{what}} must be number",

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
            noObjectsToDisplay: "No {{what}} to display",

            // Controls
            rowsPerPage: "Rows per page",

            // Page headers
            editPage: "Edit",

            // Actions
            edit: "Edit",
            delete: "Delete",
            add: "Add",
            new: "New",
            newShe: "New",
            
            // Users
            userPage: "User",
            userList: "User list",
            roles: "Roles",

            // Persons
            person: "Person",
            personList: "Person list",
            birthYear: "Year of birth",
            deathYear: "Year of death",
            
            // Common
            unknown: "Unknown",
            alternativeObject: "Alternative",
            name: "Name",
            externDatabaseIds: "Extern database ID",
            externId: "Extern identifier",
            reset: "Reset",

            basic: "Basic",
            informations: "Informations",
        }
    }
}

export default lan;