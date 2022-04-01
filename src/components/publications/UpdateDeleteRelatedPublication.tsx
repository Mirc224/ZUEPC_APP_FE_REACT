import { Grid, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { FormikFieldSchema, RelatedPublicationFormValues } from '../../types/common/component.types'
import RelatedPublicationForm from './RelatedPublicationForm'
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

type Props = {
    formKey: number,
    formId: string,
    defaultFieldSchema: FormikFieldSchema[],
    values: RelatedPublicationFormValues,
    direction?: any,
    onDelete?: (key: number) => void
    onUpdate?: (key: number, values: RelatedPublicationFormValues) => void
}

const UpdateDeleteRelatedPublication = (props: Props) => {
    const {
        formKey,
        formId,
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

    const handleSubmit = (values: RelatedPublicationFormValues) => {
        if (values.relatedPublicationName !== null) {
            onUpdate && onUpdate(formKey, values);
        }
    }

    const handleOnChange = (values: RelatedPublicationFormValues, dirty: boolean) => {
        setEdited(dirty);
    }

    return (
        <>
            {_isMounted.current &&
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <RelatedPublicationForm
                            formId={formId}
                            schema={newSchema}
                            onSubmit={handleSubmit}
                            onChange={handleOnChange}
                            initPublicationName={values.relatedPublicationName}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        {onUpdate &&
                            <IconButton form={formId} color="primary" disabled={!edited} type="submit">
                                <CheckIcon />
                            </IconButton>}
                        {onDelete &&
                            <IconButton color="error" onClick={() => onDelete(formKey)}>
                                <ClearIcon />
                            </IconButton>}
                    </Grid>
                </Grid>}
        </>
    )
}

export default UpdateDeleteRelatedPublication