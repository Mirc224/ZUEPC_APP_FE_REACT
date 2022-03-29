import * as yup from 'yup';
import { FormikFieldSchema } from '../types/common/component.types';

export const personBasicInfoSchema: FormikFieldSchema[] = [
    {
        name: "birthYear",
        labelTranslationKey: "birthYear",
        validationSchema: (yup
            .number()
            .typeError('mustBeNumber')
            .nullable(true)),
        type: "text",
        initValue: "",
    },
    {
        name: "deathYear",
        labelTranslationKey: "deathYear",
        validationSchema: (yup
            .number()
            .typeError('mustBeNumber')
            .nullable(true)),
        type: "text",
        initValue: ""
    },
]

export const personNameSchema: FormikFieldSchema[] = [
    {
        name: "firstName",
        type: "text",
        initValue: ""
    },
    {
        name: "lastName",
        type: "text",
        initValue: ""
    },
    {
        name: "nameType",
        type: "text",
        initValue: "",
    },
]


export const personExternIdentifierSchema: FormikFieldSchema[] = [
    {
        name: 'externIdentifierValue',
        type: "text",
        initValue: ""
    }
]