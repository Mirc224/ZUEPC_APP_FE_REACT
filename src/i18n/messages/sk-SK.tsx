import { LOCALES } from "../locales"

const lan = {
    [LOCALES.SLOVAK]: {
        translation: {
            registration: "Registrácia",
            firstName: "Meno",
            lastName: "Priezvisko",
            email: "Email",
            passwordConfirmation: "Potvrdenie hesla",
            password: "Heslo",
            submit: "Odoslať",
            search: "Hľadať",

            // Search field
            nameAndSurnameSearch: "Meno a priezvisko",

            // Validation
            isRequiredIt: "{{what}} je povinné",
            isRequiredHe: "{{what}} je povinný",
            minLength: "{{what}} musí mať dĺžku aspoň {{len}} znakov",
            enterValid: "Zadajte valídny {{what}}",
            passwordMatch: "Heslá sa musia zhodovať",
            invalidEmailOrPassword: "Nesprávny email alebo heslo",
            emailAlreadyUsed: "Email sa už používa",

            // Endpoints
            users: "Používatelia",
            publications: "Publikácie",
            persons: "Osoby",
            institutions: "Inštitúcie",
            login: "Prihlásiť sa",
            register: "Registrovať",
            logout: "Odhlásiť sa",

            // Roles
            user: 'Používateľ',
            editor: 'Editor',
            admin: 'Admin',

            // Messages
            logoutMessage: "Boli ste odhlasený",
            missingMessage: "Stránka neexistuje",
            unauthorized: "Neoprávnený",

            // Controls
            rowsPerPage: "Záznamov na stránku",

            // Page headers
            editPage: "Editácia",
            userPage: "Používateľ",
            userList: "Zoznam používateľov",

            roles: "Role",
        }
    },
}

export default lan;