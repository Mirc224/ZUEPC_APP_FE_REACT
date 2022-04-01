import { Box, Card, Grid, IconButton } from '@mui/material';
import React, { useState } from 'react'
import { FormikFieldSchema, RelatedPublicationFormValues } from '../../types/common/component.types';
import AddIcon from '@mui/icons-material/Add';
import RelatedPublicationForm from './RelatedPublicationForm';
import UpdateDeleteRelatedPublication from './UpdateDeleteRelatedPublication';

type Props = {
    relatedPublications: RelatedPublicationFormValues[],
    newItemFormSchema: FormikFieldSchema[],
    onNewItemSubmit: (values: RelatedPublicationFormValues, dirty: boolean) => void,
    onItemDelete: (key: number) => void,
    onExistItemUpdate: (key: number, values: RelatedPublicationFormValues) => void
}

const NewRelatedPublicationWithExistingForm = (props: Props) => {
    const {
        relatedPublications,
        newItemFormSchema,
        onNewItemSubmit,
        onItemDelete,
        onExistItemUpdate } = props;
    const [canAdd, setCanAdd] = useState(false);
    const { v4: uuidv4 } = require('uuid');
    const formName = "new-rel-pub";

    const handleNewItemFormChange = (values: RelatedPublicationFormValues, dirty: boolean) => {
        setCanAdd(dirty);
    }

    
  return (
      <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center" direction="row">
                  <Grid item xs>
                      <RelatedPublicationForm
                          formId={formName}
                          schema={newItemFormSchema}
                          onSubmit={onNewItemSubmit}
                          onChange={handleNewItemFormChange}
                          onReset={() => setCanAdd(false)}
                          resetAfterSubmit={true}
                          initPublicationName={null}
                      />
                  </Grid>
                  <Grid item xs={1}>
                      <IconButton
                          disabled={!canAdd}
                          form={formName}
                          color="success"
                          type="submit">
                          <AddIcon />
                      </IconButton>
                  </Grid>
              </Grid>
          </Grid>
          <Grid item xs>
              {relatedPublications.length > 0 &&
                  <Grid container spacing={2} alignItems="center">
                      {relatedPublications.map((x, i) => {
                          const uid = uuidv4()
                          return (
                              <Grid item key={uid} xs={12}>
                                  <Card>
                                      <Box sx={{ p: 2 }}>
                                          <UpdateDeleteRelatedPublication
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

export default NewRelatedPublicationWithExistingForm