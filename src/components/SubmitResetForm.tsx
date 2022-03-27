import { Grid, TextField, useMediaQuery, useTheme } from '@mui/material'
import { FormikErrors, FormikTouched, useFormik } from 'formik'
import React, { useEffect, useRef } from 'react'
import * as yup from 'yup';
import { useTranslation } from 'react-i18next'
import { FormikFieldSchema } from '../types/entities/component.typs'

type Props = {
    fields: FormikFieldSchema[],
    formId: string,
    direction?: any,
    resetAfterSubmit?: boolean
    onSubmit: (values: any, dirty: boolean) => void
    onReset?: (values: any) => void
    onValueChange?: (values: any, dirty: boolean) => void
}

const SubmitResetForm = (props: Props) => {
    const { fields, formId, direction, onSubmit, onReset, resetAfterSubmit, onValueChange } = props;
    const _isMounted = useRef(true);
    const { t } = useTranslation();
    const initValues = fields.reduce(((r, c) => Object.assign(r, { [c.name]: c.initValue })), {})
    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const validationSchema = yup.object(
        fields.reduce(((r, c) => Object.assign(r, { [c.name]: c.validationSchema })), {})
    )

    useEffect(() => {

        return () => {
            _isMounted.current = false;
        }
    }, [])
    const handleSubmit = (values: any) => {
        onSubmit(values, formik.dirty);
        if (resetAfterSubmit && _isMounted.current) {
            formik.handleReset(null);
        }
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
        onReset: onReset
    });

    useEffect(() => {
        // let isMounted = true;
        onValueChange && onValueChange(formik.values, formik.dirty);
    }, [formik.values])

    return (
            
        <form id={formId} onSubmit={(e) => formik.handleSubmit(e)} onReset={(e) => formik.handleReset(e)}>
            <Grid container direction={direction && largeScreen ? direction : "column"} spacing={2} justifyContent="center">
                {fields.map((x) =>
                    <Grid key={x.name} item xs>
                        <TextField
                            fullWidth
                            {...x.fieldProps}
                            name={x.name}
                            label={t(x.name)}
                            value={formik.values[x.name as keyof {}]}
                            onChange={(e) => { formik.handleChange(e) }}
                            error={
                                formik.touched[x.name as keyof FormikTouched<{}>] && 
                                Boolean(formik.errors[x.name as keyof FormikErrors<{}>])}
                            helperText={
                                formik.touched[x.name as keyof FormikTouched<{}>] &&
                                formik.errors[x.name as keyof FormikErrors<{}>] ?
                                    t(formik.errors[x.name as keyof FormikErrors<{}>],
                                        { what: t(x.labelTranslationKey ? x.labelTranslationKey : x.name) })
                                    : null}
                        />
                    </Grid>
                )}
            </Grid>
        </form >
    )
}

export default SubmitResetForm