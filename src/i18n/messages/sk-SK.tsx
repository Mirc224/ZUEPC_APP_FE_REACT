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

            // Messages
            logoutMessage: "Boli ste odhlasený",
            missingMessage: "Stránka neexistuje",
            unauthorized: "Neoprávnený",

            // Controls
            rowsPerPage: "Záznamov na stránku",

            // Page headers
            user: "Používateľ",
            userList: "Zoznam používateľov"
        }
    },
}

export default lan;