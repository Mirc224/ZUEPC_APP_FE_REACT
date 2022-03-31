import { Box, Card, Grid, IconButton, useMediaQuery, useTheme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { FormikFieldSchema } from '../../types/common/component.types';
import UpdateDeleteItem from './UpdateDeleteItem';
import { useState } from 'react';
import SubmitResetForm from '../common/SubmitResetForm';

type Props<T> = {
    formName: string,
    newItemFormSchema: FormikFieldSchema[],
    existItemFormSchema: FormikFieldSchema[],
    items: T[],
    onNewItemSubmit: (values: T, dirty: boolean) => void,
    onItemDelete?: (key: number) => void,
    onEixstItemUpdate?: (key: number, values: T) => void,
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
    const [dirty, setDirty] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.up('md'));
    const { v4: uuidv4 } = require('uuid');

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <SubmitResetForm
                            direction={fullScreen ? "row" : "column"}
                            formId={formName}
                            onSubmit={onNewItemSubmit}
                            onValueChange={(v, dirty) => setDirty(dirty)}
                            fields={newItemFormSchema}
                            resetAfterSubmit={true} />
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton 
                        disabled={!dirty}
                        form={formName} 
                        color="success" 
                        type="submit">
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
                                            direction={fullScreen ? "row" : "column"}
                                            formName={uid}
                                            defaultFieldSchema={existItemFormSchema}
                                            onDelete={onItemDelete}
                                            onUpdate={onEixstItemUpdate}
                                            values={x} />
                                    </Box>
                                </Card>
                            </Grid>)
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NewItemWithExistingUpdateDeletePreview
