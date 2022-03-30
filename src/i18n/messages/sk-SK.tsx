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
            mustBeNumber: "{{what}} musí byť číslo",

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
            noObjectsToDisplay: "Nenašli sa {{what}} na zobrazenie",
            permanentAction: "Táto akcia je permanentná",

            // Controls
            rowsPerPage: "Záznamov na stránku",

            // Page headers
            editPage: "Editácia",

            // Actons
            edit: "Editovať",
            delete: "Zmazať",
            update: "Upraviť",
            add: "Pridať",
            new: "Nový",
            newShe: "Nová",
            close: "Zatvoriť",
            
            // Users
            roles: "Role",
            userPage: "Používateľ",
            userList: "Zoznam používateľov",
            
            // Persons
            person: "Osoba",
            personList: "Zoznam osôb",
            birthYear: "Rok narodenia",
            deathYear: "Rok úmrtia",
            nameType: "Typ mena",

            // Institutions
            institution: "Inštitúcia",
            institutionList: "Zoznam inštitúcií",
            institutionLevel: "Úroveň inštitúcie",
            institutionType: "Typ inštitúcie",

            // Publications
            publication: "Publikácia",
            publicationList: "Zoznam publikácii",
            publicationType: "Typ inštitúcie",
            publicationIdentifier: "Identifikátor publikácie",
            publicationAuthor: "Autor publikáce",
            relatedPublication: "Súvisiaca publikácia",
            publicationActivity: "Publikačná činnosť",
            publishYear: "Rok publikácie",
            documentType: "Typ dokumentu",
            author: "Autor",
            authorName: "Meno autora",
            relatedPerson: "Súvisiaca osoba",
            affiliatedInstitution: "Pridružená inštitúcia",
            contributionRatio: 'Miera prispenia',
            role: "Rola",
            relation: "Vzťah",
            citationCategory: "Kategória citácie",
            
            // Common
            externIdentifierValue: "Hodnota ID v externej databáze",
            unknown: "Neznáme",
            alternativeHe: "Alternatívny",
            alternativeIt: "Alternatívne",
            name: "Názov",
            externDatabaseIds: "ID v externej databáze",
            externId: "Externý identifikátor",
            reset: "Reset",

            basic: "Základné",
            informations: "Informácie",
        }
    },
}

export default lan;