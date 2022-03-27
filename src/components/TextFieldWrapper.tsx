import { TextField } from '@mui/material'
import { useField } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { matchPath } from 'react-router'

type Props = {
    name: string,
    labelTranslationKey?: string,
    [x: string]: any;
}

const TextFieldWrapper = ({ name, labelTranslationKey, ...otherProps }: Props) => {
    const [field, mata] = useField(name);
    const { t } = useTranslation();
    const configTextfield: any = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    }
    if (mata && mata.touched && mata.error) {
        configTextfield.error = true;
        configTextfield.helperText = mata.touched &&
            mata.error
            ? t(mata.error, { what: t(labelTranslationKey ? labelTranslationKey : name) })
            : null;
    }

    return (
        <TextField {...configTextfield}/>
    )
}

export default TextFieldWrapper