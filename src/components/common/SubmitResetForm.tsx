import * as yup from 'yup';
import { Grid } from '@mui/material'
import { FormikFieldSchema } from '../../types/common/component.types'
import { useFormik } from 'formik';
import FormikTextFields from './FormikTextFields';

type Props = {
    formId: string,
    fields: FormikFieldSchema[],
    direction?: any,
    resetAfterSubmit?: boolean,
    onSubmit: (values: any, dirty: boolean) => void,
    onReset?: () => void,
    onValueChange?: (value: any, dirty: boolean) => void
}

const SubmitResetForm = (props: Props) => {
    const { formId, fields, direction, onSubmit, onReset, onValueChange, resetAfterSubmit} = props;
    const validationSchema = yup.object(
        fields.reduce(((r, c) => Object.assign(r, { [c.name]: c.validationSchema })), {})
    )
    const initValues = fields.reduce(((r, c) => Object.assign(r, { [c.name]: c.initValue })), {})

    const handleSubmit = (values: any) => {
        const clearedValues = Object
            .keys(values)
            .reduce(((r, key) => Object.assign(r, (values[key] && { [key]: values[key] }))), {})
        onSubmit(clearedValues, formik.dirty);
        if (resetAfterSubmit) {
            formik.handleReset(null)
        }
    }

    const handleReset = () => {
        onReset && onReset();
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
        onReset: handleReset
    });
    return (
        <form
            id={formId}
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}>
            <Grid
                container
                direction={direction ? direction : "row"}
                spacing={2}>
                <FormikTextFields
                    formik={formik}
                    fields={fields}
                    onValueChange={onValueChange}
                />
            </Grid>
        </form>
    )
}

export default SubmitResetForm