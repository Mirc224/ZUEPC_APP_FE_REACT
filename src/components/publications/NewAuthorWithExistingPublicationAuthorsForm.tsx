import * as yup from 'yup';
import { Box, Card, Grid, IconButton } from '@mui/material'
import { AuthorFormValues, FormikFieldSchema } from '../../types/common/component.types';
import AddIcon from '@mui/icons-material/Add';
import AuthorForm from './AuthorForm';
import { useState } from 'react';
import UpdateDeleteAuthor from './UpdateDeleteAuthor';
import { handleDeleteItem, handleEntityItemUpdate, handleEntityNewItem } from '../../utils/zuepc-item-utils';

type Props = {}

const NewAuthorWithExistingPublicationAuthorsForm = (props: Props) => {
    const [canAdd, setCanAdd] = useState(false);
    const [authors, setAuthors] = useState<AuthorFormValues[]>([])
    const { v4: uuidv4 } = require('uuid');

    const newPublicationAuthorSchema: FormikFieldSchema[] = [
        {
            name: "contributionRatio",
            type: "text",
            initValue: "",
            validationSchema: (yup
                .number()
                .typeError('mustBeNumber')
                .nullable(true)),
        },
        {
            name: "role",
            type: "text",
            initValue: ""
        },
    ]

    const validationSchema = yup.object(
        newPublicationAuthorSchema.reduce(((r, c) => Object.assign(r, { [c.name]: c.validationSchema })), {})
    )
    const initValues = newPublicationAuthorSchema.reduce(((r, c) => Object.assign(r, { [c.name]: c.initValue })), {})

    const handleNewAuthorSubmit = (values: AuthorFormValues, dirty: boolean) => {
            handleEntityNewItem(values, dirty, setAuthors)
    }

    const handleNewItemForm = (values: AuthorFormValues, dirty: boolean) => {
        setCanAdd(dirty);
    }

    const handleAuthorUpdate = (key: number, values: AuthorFormValues) => {
        handleEntityItemUpdate(key, values, setAuthors)
    }

    const handleAuthorDelete = (key: number) => {
        handleDeleteItem(key, setAuthors) 
    }


    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center" direction="row">
                    <Grid item xs>
                        <AuthorForm
                            formId='new-author'
                            schema={newPublicationAuthorSchema}
                            onSubmit={handleNewAuthorSubmit}
                            onChange={handleNewItemForm}
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
                                                defaultFieldSchema={newPublicationAuthorSchema}
                                                onUpdate={handleAuthorUpdate}
                                                onDelete={handleAuthorDelete}
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