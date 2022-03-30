import { LOCALES } from "../locales"

const lan =  {
    [LOCALES.ENGLISH]: {
        translation: {
            // Registration fields
            registration: "Registration",
            firstName: "Firstname",
            lastName: "Lastname",
            email: "Email",
            password: "Password",
            passwordConfirmation: "Password confirmation",
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
            permanentAction: "This action is permanent",

            // Controls
            rowsPerPage: "Rows per page",

            // Page headers
            editPage: "Edit",

            // Actions
            edit: "Edit",
            delete: "Delete",
            update: "Update",
            add: "Add",
            new: "New",
            newShe: "New",
            close: "Close",
            
            // Users
            userPage: "User",
            userList: "User list",
            roles: "Roles",

            // Persons
            person: "Person",
            personList: "Person list",
            birthYear: "Year of birth",
            deathYear: "Year of death",
            nameType: "Name type",

            // Institutions
            institution: "Institution",
            institutionList: "Institution list",
            institutionLevel: "Institution level",
            institutionType: "Institution type",

            // Publications
            publication: "Publication",
            publicationList: "Publication list",
            publicationType: "Institution type",
            publicationIdentifier: "Publication Identifier",
            publicationAuthor: "Publication author",
            relatedPublication: "Related publication",
            publicationActivity: "Publication activity",
            publishYear: "Publish year",
            documentType: "Document type",
            author: "Author",
            authorName: "Author name",
            relatedPerson: "Related person",
            affiliatedInstitution: "Affiliated institution",
            contributionRatio: 'Contribution ratio',
            role: "Role",
            relation: "Relation",
            citationCategory: "Citation category",
            activityYear: "Activity year",
            category: "Category",
            governmentGrant: "Government grant",
            
            // Common
            externIdentifierValue: "Extern database ID value",
            unknown: "Unknown",
            alternativeHe: "Alternative",
            alternativeIt: "Alternative",
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