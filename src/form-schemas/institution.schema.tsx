import * as yup from 'yup';
import { FormikFieldSchema } from "../types/common/component.types"

export const institutionBasicInfoSchema: FormikFieldSchema[] = [
    {
        name: "level",
        labelTranslationKey: "institutionLevel",
        validationSchema: (yup
            .number()
            .integer('mustBeWholeNumber')
            .typeError('mustBeWholeNumber')
            .nullable(true)),
        type: "text",
        initValue: "",
    },
    {
        name: "institutionType",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(100, 'maxLength')
            .nullable(true))
    },
]

export const institutionNameSchema: FormikFieldSchema[] = [
    {
        name: "name",
        type: "text",
        initValue: "",
        validationSchema: (yup
            .string()
            .max(250, 'maxLength')
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

export const institutionExternIdentifierSchema: FormikFieldSchema[] = [
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

export const institutionSearchSchema: FormikFieldSchema[] = [
    {
        name: "name",
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