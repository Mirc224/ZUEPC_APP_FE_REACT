import { Grid, TextField, useMediaQuery, useTheme } from '@mui/material'
import { useFormik } from 'formik'
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
    // const validationSchema = yup.object(
    //     fields.reduce(((r, c) => Object.assign(r, { [c.name]: c.validationSchema })), {})
    // )

    const validationSchema = yup.object({})
    useEffect(() => {

        return () => {
            _isMounted.current = false;
            console.log("Odstavujem form " + formId)
        }
    }, [])
    const handleSubmit = (values: any) => {
        if (!_isMounted.current) {
            return;
        }
        onSubmit(values, formik.dirty);
        if (resetAfterSubmit) {
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
        if (!_isMounted.current) {
            return;
        }
        // let isMounted = true;
        // onValueChange && isMounted && onValueChange(formik.values, formik.dirty);
        // return () => {
        //     isMounted = false;
        // }
    }, [formik.values])

    return (
        <form id={formId} onSubmit={(e) => _isMounted.current && formik.handleSubmit(e)} onReset={(e) => _isMounted.current && formik.handleReset(e)}>
            <p>{JSON.stringify(_isMounted.current)}</p>
            <Grid container direction={direction && largeScreen ? direction : "column"} spacing={2} justifyContent="center">
                {_isMounted.current && fields.map((x) =>
                    <Grid key={x.name} item xs>
                        <TextField
                            fullWidth
                            {...x.fieldProps}
                            name={x.name}
                            label={t(x.name)}
                            value={_isMounted.current && (formik.values as any)[x.name]}
                            onChange={(e) => { _isMounted.current && formik.handleChange(e) }}
                            error={_isMounted.current && (formik.touched as any)[x.name] && Boolean((formik.errors as any)[x.name])}
                            helperText={_isMounted.current &&
                                (formik.touched as any)[x.name] &&
                                    (formik.errors as any)[x.name] ?
                                    t((formik.errors as any)[x.name],
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