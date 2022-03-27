import { Button, Grid, IconButton } from '@mui/material'
import { FormikFieldSchema } from '../types/entities/component.typs'
import SubmitResetForm from './SubmitResetForm'
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useRef, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

type Props = {
    formKey: number,
    formName: string,
    defaultFieldSchema: FormikFieldSchema[],
    values: any,
    direction?: any,
    onDelete?: (key: number) => void
    onUpdate?: (key: number, values: any) => void
}

const UpdateDeleteItem = (props: Props) => {
    const {
        formKey,
        formName,
        defaultFieldSchema,
        values,
        direction,
        onDelete,
        onUpdate } = props;
    const _isMounted = useRef(true);
    const [edited, setEdited] = useState(true);
    const newSchema = defaultFieldSchema.map((x) => {
        if (values[x.name] || values[x.name] === "") {
            return { ...x, initValue: values[x.name] }
        }
        return x;
    });

    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    }, [])


    const formId = formName + formKey;

    const handleFormChange = (values: any, dirty: boolean) => {
        setEdited(dirty);
    }

    return (
        <>
            {_isMounted.current &&
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <SubmitResetForm
                        formId={formId}
                        fields={[...newSchema]}
                        onValueChange={handleFormChange}
                        direction={direction ? direction : "row"}
                        onSubmit={(val) => {
                            onUpdate && onUpdate(formKey, val);
                        }}
                        resetAfterSubmit={true} />
                </Grid>
                <Grid item xs={1}>
                    { onUpdate &&
                    <IconButton form={formId} color="primary" disabled={!edited} type="submit">
                        <CheckIcon />
                    </IconButton> }
                    { onDelete &&
                    <IconButton color="error" onClick={() => onDelete(formKey)}>
                        <ClearIcon />
                    </IconButton>}
                </Grid>
            </Grid>}
        </>
    )
}

export default UpdateDeleteItem