import { Grid, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { AuthorFormValues, FormikFieldSchema } from '../../types/common/component.types'
import AuthorForm from './AuthorForm'
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

type Props = {
    formKey: number,
    formId: string,
    defaultFieldSchema: FormikFieldSchema[],
    values: AuthorFormValues,
    direction?: any,
    onDelete?: (key: number) => void
    onUpdate?: (key: number, values: AuthorFormValues) => void
}

const UpdateDeleteAuthor = (props: Props) => {
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

    const handleSubmit = (values: AuthorFormValues) => {
        if(values.personName !== null && values.institutionName !== null) {
            onUpdate && onUpdate(formKey, values);
        }
    }

    const handleOnChange = (values: AuthorFormValues, dirty: boolean) => {
        setEdited(dirty);
    }

    return (
        <>
            {_isMounted.current &&
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <AuthorForm
                            formId={formId}
                            schema={newSchema}
                            onSubmit={handleSubmit}
                            onChange={handleOnChange}
                            initPersonName={values.personName}
                            initInstitutionName={values.institutionName}
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

export default UpdateDeleteAuthor