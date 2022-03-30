import { FormikFieldSchema } from "../types/common/component.types";

export const publicationSearchSchema: FormikFieldSchema[] = [
    {
        name: "name",
        initValue: "",
        type: "text",
    },
    {
        name: "authorName",
        initValue: "",
        type: "text",
    },
    {
        name: "identifierValue",
        labelTranslationKey: "publicationIdentifier",
        initValue: "",
        type: "text",
    },
    {
        name: 'externIdentifierValue',
        type: "text",
        initValue: ""
    }
]