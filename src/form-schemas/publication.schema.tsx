import * as yup from 'yup';
import { FormikFieldSchema } from "../types/common/component.types";

export const publicationSearchSchema: FormikFieldSchema[] = [
    {
        name: "name",
        labelTranslationKey: "name",
        initValue: "",
        type: "text"
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
            .integer('mustBeWholeNumber')
            .typeError('mustBeWholeNumber')
            .nullable(true)),
    },
    {
        name: 'activityCategory',
        labelTranslationKey: 'category',
        type: "text",
        initValue: ""
    },
    {
        name: 'governmentGrant',
        labelTranslationKey: 'governmentGrant',
        type: "text",
        initValue: ""
    },
    {
        name: 'activityYearFrom',
        labelTranslationKey: 'activityYearFrom',
        type: "text",
        initValue: "",
        validationSchema: (yup
            .number()
            .integer('mustBeWholeNumber')
            .typeError('mustBeWholeNumber')
            .nullable(true)),
    },
    {
        name: 'activityYearTo',
        labelTranslationKey: 'activityYearTo',
        type: "text",
        initValue: "",
        validationSchema: (yup
            .number()
            .integer('mustBeWholeNumber')
            .typeError('mustBeWholeNumber')
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
            .string()
            .max(100, 'maxLength')
            .nullable(true))
    },
    {
        name: "publishYear",
        labelTranslationKey: "publishYear",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .number()
            .integer('mustBeWholeNumber')
            .typeError('mustBeWholeNumber')
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
        initValue: "",
        validationSchema: (yup
            .string()
            .max(100, 'maxLength')
            .nullable(true))
    },
]

export const relatedPublicationSchema: FormikFieldSchema[] = [
    {
        name: "relationType",
        labelTranslationKey: "relation",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(100, 'maxLength')
            .nullable(true))
    },
    {
        name: "citationCategory",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(100, 'maxLength')
            .nullable(true))
    },
]

export const publicationNameSchema: FormikFieldSchema[] = [
    {
        name: "name",
        labelTranslationKey: "name",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(100, 'maxLength')
            .nullable(true))
    },
    {
        name: "nameType",
        labelTranslationKey: "nameType",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(100, 'maxLength')
            .nullable(true))
    },
]

export const publicationIdentifierSchema: FormikFieldSchema[] = [
    {
        name: "identifierName",
        labelTranslationKey: "identifierName",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(100, 'maxLength')
            .nullable(true))
    },
    {
        name: "identifierValue",
        labelTranslationKey: "identifierValue",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(100, 'maxLength')
            .nullable(true))
    },
    {
        name: "iSForm",
        labelTranslationKey: "identifierISForm",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(50, 'maxLength')
            .nullable(true))
    },
]

export const publicationExternDatabaseIdSchema: FormikFieldSchema[] = [
    {
        name: "externIdentifierValue",
        labelTranslationKey: "externIdentifierValue",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(250, 'maxLength')
            .nullable(true))
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
            .integer('mustBeWholeNumber')
            .typeError('mustBeWholeNumber')
            .nullable(true)),
    },
    {
        name: "category",
        labelTranslationKey: "category",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(100, 'maxLength')
            .nullable(true))
    },
    {
        name: "governmentGrant",
        labelTranslationKey: "governmentGrant",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(100, 'maxLength')
            .nullable(true))
    }
]