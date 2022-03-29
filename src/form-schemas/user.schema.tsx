import * as yup from 'yup';
import { FormikFieldSchema } from "../types/common/component.types";

export const userSearchSchema: FormikFieldSchema[] = [
    {
        name: "name",
        labelTranslationKey: 'nameAndSurnameSearch',
        initValue: "",
        type: "text",
    },
    {
        initValue: '',
        labelTranslationKey: 'email',
        type: "text",
        name: "email"
    },
]

export const userBasicInfoSchema: FormikFieldSchema[] = [
    {
        name: "id",
        labelTranslationKey: 'Id',
        type: "text",
        initValue: "",
        fieldProps: { disabled: true }
    },
    {
        name: "email",
        type: "text",
        initValue: "",
        fieldProps: { disabled: true }
    },
    {
        name: "firstName",
        type: "text",
        validationSchema: yup
            .string()
            .required('isRequiredIt'),
        initValue: "",
    },
    {
        name: "lastName",
        type: "text",
        validationSchema: yup
            .string()
            .required('isRequiredIt'),
        initValue: "",
    }
]