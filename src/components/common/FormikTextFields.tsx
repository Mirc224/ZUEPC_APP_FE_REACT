import { Grid, TextField } from '@mui/material'
import { FormikErrors, FormikTouched } from 'formik'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FormikFieldSchema } from '../../types/common/component.types'

type Props = {
    children?: any,
    fields: FormikFieldSchema[],
    formik: any,
    itemProps?: any,
    onValueChange?: (values: any, dirty: boolean) => void
}

const FormikTextFields = (props: Props) => {
    const { formik, fields, onValueChange, itemProps } = props;
    const _isMounted = useRef(true);
    const { t } = useTranslation();

    useEffect(() => {

        return () => {
            _isMounted.current = false;
        }
    }, [])


    useEffect(() => {
        onValueChange && onValueChange(formik.values, formik.dirty);
    }, [formik.values])

    const PrintFields = () => {
        if(itemProps) {
            return <>
                {fields.map((x) =>
                    <Grid key={x.name} item {...itemProps}>
                        <TextField
                            fullWidth
                            {...x.fieldProps}
                            name={x.name}
                            label={x.labelTranslationKey ? t(x.labelTranslationKey) : t(x.name)}
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
                    </Grid>)}
            </>
        }

        return <>
            {fields.map((x) =>
                <Grid key={x.name} item xs>
                    <TextField
                        fullWidth
                        {...x.fieldProps}
                        name={x.name}
                        label={x.labelTranslationKey ? t(x.labelTranslationKey) : t(x.name)}
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
                </Grid>)}
        </>
    }

    return (
        <>
            {PrintFields()}
        </>
    )
}

export default FormikTextFields