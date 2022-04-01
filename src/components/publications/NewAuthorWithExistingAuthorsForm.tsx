import { Box, Card, Grid, IconButton } from '@mui/material'
import { AuthorFormValues, FormikFieldSchema } from '../../types/common/component.types';
import AddIcon from '@mui/icons-material/Add';
import AuthorForm from './AuthorForm';
import { useEffect, useRef, useState } from 'react';
import UpdateDeleteAuthor from './UpdateDeleteAuthor';

type Props = {
    authors: AuthorFormValues[],
    newItemFormSchema: FormikFieldSchema[],
    onNewItemSubmit: (values: AuthorFormValues, dirty: boolean) => void,
    onItemDelete: (key: number) => void,
    onExistItemUpdate: (key: number, values: AuthorFormValues) => void
}

const NewAuthorWithExistingPublicationAuthorsForm = (props: Props) => {
    const { 
        authors, 
        newItemFormSchema, 
        onNewItemSubmit, 
        onItemDelete, 
        onExistItemUpdate } = props;
    const [canAdd, setCanAdd] = useState(false);
    const { v4: uuidv4 } = require('uuid');

    const _isMounted = useRef(true);

    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    }, [])

    const handleNewItemFormChange = (values: AuthorFormValues, dirty: boolean) => {
        _isMounted.current && setCanAdd(dirty);
    }

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center" direction="row">
                    <Grid item xs>
                        <AuthorForm
                            formId='new-author'
                            schema={newItemFormSchema}
                            onSubmit={onNewItemSubmit}
                            onChange={handleNewItemFormChange}
                            resetAfterSubmit={true}
                            initPersonName={null}
                            initInstitutionName={null}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            disabled={!canAdd}
                            form="new-author"
                            color="success"
                            type="submit">
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs>
                {authors.length > 0 &&
                    <Grid container spacing={2} alignItems="center">
                        {authors.map((x, i) => {
                            const uid = uuidv4()
                            return (
                                <Grid item key={uid} xs={12}>
                                    <Card>
                                        <Box sx={{p: 2}}>
                                            <UpdateDeleteAuthor
                                                formKey={i}
                                                formId={uid}
                                                defaultFieldSchema={newItemFormSchema}
                                                onUpdate={onExistItemUpdate}
                                                onDelete={onItemDelete}
                                                values={x}
                                            />
                                        </Box>
                                    </Card>
                                </Grid>
                            )
                        }
                        )}
                    </Grid>
                }
            </Grid>
        </Grid>
    )
}

export default NewAuthorWithExistingPublicationAuthorsForm