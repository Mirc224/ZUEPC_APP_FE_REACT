import * as yup from 'yup';
import { FormikFieldSchema } from "../types/common/component.types"

export const institutionBasicInfoSchema: FormikFieldSchema[] = [
    {
        name: "level",
        labelTranslationKey: "institutionLevel",
        validationSchema: (yup
            .number()
            .typeError('mustBeNumber')
            .nullable(true)),
        type: "text",
        initValue: "",
    },
    {
        name: "institutionType",
        type: "text",
        initValue: ""
    },
]

export const institutionNameSchema: FormikFieldSchema[] = [
    {
        name: "name",
        type: "text",
        initValue: ""
    },
    {
        name: "nameType",
        type: "text",
        initValue: "",
    },
]

export const institutionExternIdentifierSchema: FormikFieldSchema[] = [
    {
        name: 'externIdentifierValue',
        type: "text",
        initValue: ""
    }
]