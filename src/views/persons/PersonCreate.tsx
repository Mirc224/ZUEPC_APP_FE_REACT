import { Box, Button, Card, Container, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import SubmitResetForm from '../../components/SubmitResetForm';
import UpdateDeleteItem from '../../components/UpdateDeleteItem';
import { FormikFieldSchema, PersonExternDatabaseId, PersonName } from '../../types/entities/component.typs';
import AddIcon from '@mui/icons-material/Add';
import NewItemWithExistingUpdateDeletePreview from '../../components/NewItemWithExistingUpdateDeletePreview';
import { CreatePersonWithDetailsCommand } from '../../types/api/persons/commands.types';
import usePersonService from '../../hooks/persons/usePersonService';

type Props = {}


const PersonCreate = (props: Props) => {
  const { t } = useTranslation();
  const {createPerson} = usePersonService();
  const [personNames, setPersonNames] = useState<PersonName[]>([]);
  const [personExternDbIds, setPersonExternDbIds] = useState<PersonExternDatabaseId[]>([]);

  const basicInfoSchema: FormikFieldSchema[] = [
    {
      name: "birthYear",
      labelTranslationKey: "birthYear",
      validationSchema: (yup
        .number()
        .typeError('mustBeNumber')
        .nullable(true)),
      type: "text",
      initValue: "",
    },
    {
      name: "deathYear",
      labelTranslationKey: "deathYear",
      validationSchema: (yup
        .number()
        .typeError('mustBeNumber')
        .nullable(true)),
      type: "text",
      initValue: ""
    },
  ]

  const newNameSchema: FormikFieldSchema[] = [
    {
      name: "firstName",
      type: "text",
      initValue: ""
    },
    {
      name: "lastName",
      type: "text",
      initValue: ""
    },
    {
      name: "nameType",
      type: "text",
      initValue: "",
    },
  ]

  const newExternIdentifier: FormikFieldSchema[] = [
    {
      name: 'externIdentifierValue',
      type: "text",
      initValue: ""
    }
  ]

  const clearObject = (obj: object): object => {
    return Object
      .keys(obj)
      .reduce(((r, key) => Object.assign(r, (obj[key as keyof object] && { [key]: obj[key as keyof object] }))), {})
  }

  const clearValues = (values: any): object[] => {
    return [...values.map((x: any) => {
      return clearObject(x);
    })]
  }

  const handleSubmitForm = (values: any) => {
    const clearedNames = clearValues(personNames).filter(x => Object.keys(x).length);
    const clearedExtIds = clearValues(personExternDbIds).filter(x => Object.keys(x).length);
    let objectToCreate : CreatePersonWithDetailsCommand = {
      names: clearedNames,
      externDatabaseIds: clearedExtIds
    };
    objectToCreate = Object.assign(objectToCreate, clearObject(values))
    console.log(objectToCreate);
  }

  const handleNewName = (values: any, dirty: boolean) => {
    if (dirty) {
      setPersonNames((prev) => [...prev, values]);
    }
  }

  const handleNameDelete = (key: number) => {
    setPersonNames((prev) => {
      let origArray = prev.slice();
      origArray.splice(key, 1);
      return [...origArray];
    })
  }

  const handleNamesUpdate = (key: number, values: any) => {
    if(!Object.keys(clearObject(values)).length) {
      handleNameDelete(key);
      return;
    }
    setPersonNames((prev) => {
      let current = prev.slice();
      current[key] = values;
      return [...current];
    })
  }

  const handleNewExternId = (values: any, dirty: boolean) => {
    if (dirty) {
      setPersonExternDbIds((prev) => [...prev, values]);
    }
  }

  const handleExternIdDelete = (key: number) => {
    setPersonExternDbIds((prev) => {
      let origArray = prev.slice();
      origArray.splice(key, 1);
      return [...origArray];
    })
  }

  const handleExternIdUpdate = (key: number, values: any) => {
    if (!Object.keys(clearObject(values)).length) {
      handleExternIdDelete(key);
      return;
    }
    setPersonExternDbIds((prev) => {
      let current = prev.slice();
      current[key] = values;
      return [...current];
    })
  }

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <header>
            <h1 className='text-center'>{t('newShe')} {t('person').toLowerCase()}</h1>
            <hr />
          </header>
        </Grid>
        <Grid item xs={12}>
          <main>
            <h2>{t("basic")} {t('informations').toLowerCase()}</h2>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <Container maxWidth="md">
                  <SubmitResetForm direction="row" onSubmit={handleSubmitForm} fields={basicInfoSchema} formId="whole-form" />
                </Container>
              </Grid>
            </Grid>
            <h2>{t("name")}</h2>
            <NewItemWithExistingUpdateDeletePreview 
            formName="new-name"
            newItemFormSchema={newNameSchema}
            existItemFormSchema={newNameSchema}
            items={personNames}
            onNewItemSubmit={handleNewName}
            onItemDelete={handleNameDelete}
            onEixstItemUpdate={handleNamesUpdate}
            />
            <h2>{t("externDatabaseIds")}</h2>
            <NewItemWithExistingUpdateDeletePreview
              formName="new-extern-id"
              newItemFormSchema={newExternIdentifier}
              existItemFormSchema={newExternIdentifier}
              items={personExternDbIds}
              onNewItemSubmit={handleNewExternId}
              onItemDelete={handleExternIdDelete}
              onEixstItemUpdate={handleExternIdUpdate}
            />
          </main>
          <hr />
        </Grid>
        <Grid item xs={2}>
          <footer>
            <Button form="whole-form" color="primary" variant="contained" fullWidth type="submit">
              {t("submit")}
            </Button>
          </footer>
        </Grid>
      </Grid>
    </Container >
  )
}

export default PersonCreate