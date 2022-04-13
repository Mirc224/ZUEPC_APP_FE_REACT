import * as yup from 'yup';
import { FormikFieldSchema } from '../types/common/component.types';

export const personBasicInfoSchema: FormikFieldSchema[] = [
    {
        name: "birthYear",
        labelTranslationKey: "birthYear",
        validationSchema: (yup
            .number()
            .integer('mustBeWholeNumber')
            .typeError('mustBeWholeNumber')
            .nullable(true)),
        type: "text",
        initValue: "",
    },
    {
        name: "deathYear",
        labelTranslationKey: "deathYear",
        validationSchema: (yup
            .number()
            .integer('mustBeWholeNumber')
            .typeError('mustBeWholeNumber')
            .nullable(true)),
        type: "text",
        initValue: ""
    },
]

export const personNameSchema: FormikFieldSchema[] = [
    {
        name: "firstName",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(100, 'maxLength')
            .nullable(true))
    },
    {
        name: "lastName",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(100, 'maxLength')
            .nullable(true))
    },
    {
        name: "nameType",
        labelTranslationKey: "personNameType",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(100, 'maxLength')
            .nullable(true))
    },
]


export const personExternIdentifierSchema: FormikFieldSchema[] = [
    {
        name: 'externIdentifierValue',
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(250, 'maxLength')
            .nullable(true))
    }
]

export const personSearchSchema: FormikFieldSchema[] = [
    {
        name: "name",
        labelTranslationKey: 'nameAndSurnameSearch',
        type: "text",
        initValue: ""
    },
    {
        name: "externIdentifierValue",
        labelTranslationKey: 'externId',
        type: "text",
        initValue: ""
    },
]