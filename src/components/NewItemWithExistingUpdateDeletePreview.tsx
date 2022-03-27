import { Box, Card, Grid, IconButton } from '@mui/material'
import SubmitResetForm from './SubmitResetForm'
import AddIcon from '@mui/icons-material/Add';
import { FormikFieldSchema } from '../types/entities/component.typs';
import UpdateDeleteItem from './UpdateDeleteItem';

type Props<T> = {
    formName: string,
    newItemFormSchema: FormikFieldSchema[],
    existItemFormSchema: FormikFieldSchema[],
    items: T[],
    onNewItemSubmit: (values: any, dirty: boolean) => void,
    onItemDelete?: (key: number) => void,
    onEixstItemUpdate?: (values: any, dirty: boolean) => void,
}

const NewItemWithExistingUpdateDeletePreview = <T extends object>(props: Props<T>) => {
    const {
        formName,
        newItemFormSchema,
        existItemFormSchema,
        items,
        onNewItemSubmit,
        onItemDelete,
        onEixstItemUpdate } = props;
    const { v4: uuidv4 } = require('uuid');

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <SubmitResetForm
                            direction="row"
                            formId={formName}
                            onSubmit={onNewItemSubmit}
                            fields={newItemFormSchema}
                            resetAfterSubmit={true} />
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton form={formName} color="success" type="submit">
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} direction="row">
                    {items.map((x: T, i) => {
                        const uid = uuidv4()
                        return (
                            <Grid item key={uid} xs={12}>
                                <Card>
                                    <Box sx={{ p: 2 }}>
                                        <UpdateDeleteItem
                                            formKey={i}
                                            formName={uid}
                                            defaultFieldSchema={existItemFormSchema}
                                            onDelete={onItemDelete}
                                            onUpdate={onEixstItemUpdate}
                                            values={x} />
                                    </Box>
                                </Card>
                            </Grid>)
                    }
                    )}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NewItemWithExistingUpdateDeletePreview
