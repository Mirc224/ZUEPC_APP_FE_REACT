import * as yup from 'yup';
import { FormikFieldSchema } from "../types/common/component.types";

export const publicationSearchSchema: FormikFieldSchema[] = [
    {
        name: "name",
        labelTranslationKey: "name",
        initValue: "",
        type: "text",
    },
    {
        name: "authorName",
        labelTranslationKey: "authorName",
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
        labelTranslationKey: 'externIdentifierValue',
        type: "text",
        initValue: ""
    },
    {
        name: 'documentType',
        labelTranslationKey: 'documentType',
        type: "text",
        initValue: ""
    },
    {
        name: 'institutionName',
        labelTranslationKey: 'affiliatedInstitution',
        type: "text",
        initValue: ""
    },
    {
        name: 'publishYearFrom',
        labelTranslationKey: 'publishYearFrom',
        type: "text",
        initValue: "",
        validationSchema: (yup
            .number()
            .typeError('mustBeNumber')
            .nullable(true)),
    },
    {
        name: 'publishYearTo',
        labelTranslationKey: 'publishYearTo',
        type: "text",
        initValue: "",
        validationSchema: (yup
            .number()
            .typeError('mustBeNumber')
            .nullable(true)),
    }
]


export const publicationBasicInfoSchema: FormikFieldSchema[] = [
    {
        name: "documentType",
        labelTranslationKey: "documentType",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .number()
            .typeError('mustBeNumber')
            .nullable(true)),
    },
    {
        name: "publishYear",
        labelTranslationKey: "publishYear",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .number()
            .typeError('mustBeNumber')
            .nullable(true)),
    }
]

export const publicationAuthorSchema: FormikFieldSchema[] = [
    {
        name: "contributionRatio",
        labelTranslationKey: "contributionRatio",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .number()
            .typeError('mustBeNumber')
            .nullable(true)),
    },
    {
        name: "role",
        type: "text",
        initValue: ""
    },
]

export const relatedPublicationSchema: FormikFieldSchema[] = [
    {
        name: "relationType",
        labelTranslationKey: "relation",
        type: "text",
        initValue: ""
    },
    {
        name: "citationCategory",
        type: "text",
        initValue: ""
    },
]

export const publicationNameSchema: FormikFieldSchema[] = [
    {
        name: "name",
        labelTranslationKey: "name",
        type: "text",
        initValue: ""
    },
    {
        name: "nameType",
        labelTranslationKey: "nameType",
        type: "text",
        initValue: ""
    },
]

export const publicationIdentifierSchema: FormikFieldSchema[] = [
    {
        name: "identifierValue",
        labelTranslationKey: "identifierValue",
        type: "text",
        initValue: ""
    },
    {
        name: "identifierName",
        labelTranslationKey: "identifierName",
        type: "text",
        initValue: ""
    },
    {
        name: "iSForm",
        labelTranslationKey: "identifierISForm",
        type: "text",
        initValue: ""
    },
]

export const publicationExternDatabaseIdSchema: FormikFieldSchema[] = [
    {
        name: "externIdentifierValue",
        labelTranslationKey: "externIdentifierValue",
        type: "text",
        initValue: ""
    }
]

export const publicationActivitySchema: FormikFieldSchema[] = [
    {
        name: "activityYear",
        labelTranslationKey: "activityYear",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .number()
            .typeError('mustBeNumber')
            .nullable(true)),
    },
    {
        name: "category",
        labelTranslationKey: "category",
        type: "text",
        initValue: ""
    },
    {
        name: "governmentGrant",
        labelTranslationKey: "governmentGrant",
        type: "text",
        initValue: ""
    }
]