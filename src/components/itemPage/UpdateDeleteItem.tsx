import {  Grid, IconButton } from '@mui/material'
import { FormikFieldSchema } from '../../types/common/component.types'
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useRef, useState } from 'react';
import SubmitResetForm from '../common/SubmitResetForm';

type Props<T> = {
    formKey: number,
    formName: string,
    defaultFieldSchema: FormikFieldSchema[],
    values: T,
    direction?: any,
    onDelete?: (key: number) => void
    onUpdate?: (key: number, values: T) => void
}

const UpdateDeleteItem = <T extends object>(props: Props<T>) => {
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
        if (values[x.name as keyof object] || values[x.name as keyof object] === "") {
            return { ...x, initValue: values[x.name as keyof object] }
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
        _isMounted.current && setEdited(dirty);
    }

    return (
        <>
            {_isMounted.current &&
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <SubmitResetForm
                        formId={formId}
                        fields={newSchema}
                        onValueChange={handleFormChange}
                        direction={direction ? direction : "row"}
                        onSubmit={(val) => {
                            _isMounted.current && onUpdate && onUpdate(formKey, val);
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