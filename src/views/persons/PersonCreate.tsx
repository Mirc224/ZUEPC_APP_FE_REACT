import { Button, Container, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import SubmitResetForm from '../../components/SubmitResetForm';
import UpdateDeleteItem from '../../components/UpdateDeleteItem';
import { FormikFieldSchema, PersonName } from '../../types/entities/component.typs';
import AddIcon from '@mui/icons-material/Add';

type Props = {}


const PersonCreate = (props: Props) => {
  const { t } = useTranslation();
  const [personNames, setPersonNames] = useState<PersonName[]>([])
  const { v4: uuidv4 } = require('uuid');

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

  const nameSchema: FormikFieldSchema[] = [
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
      initValue: ""
    },
  ]

  const handleSubmitForm = (values: any) => {
    let objectToCreate = Object
      .keys(values)
      .reduce(((r, key) => Object.assign(r, (values[key] && { [key]: values[key] }))), {})
    objectToCreate = Object.assign(objectToCreate, {names: personNames})
    console.log(objectToCreate)
  }

  const handleNewName = (values: any) => {
    setPersonNames((prev) => [...prev, values]);
  }

  const handleNameDelete = (key: number) => {
    setPersonNames((prev) => {
      let origArray = prev.slice();
      origArray.splice(key,1);
      return [...origArray];
    })
  }

  const handleNamesUpdate = (key: number, values:any) => {
    setPersonNames((prev) => {
      let current = prev.slice();
      current.splice(key,1);
      return [...current, values];
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
                  <SubmitResetForm direction="row" onSubmit={handleSubmitForm} fields={basicInfoSchema} formId="whole-form"/>
                </Container>
              </Grid>
            </Grid>
            <h2>{t("name")}</h2>
            <p>{JSON.stringify(personNames)}</p>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <SubmitResetForm direction={"row"} formId="new-name" onSubmit={handleNewName} fields={nameSchema} resetAfterSubmit={true} />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton form="new-name" color="success" type="submit">
                      <AddIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} direction="row">
                  {personNames.map((x, i) => {
                    const uid = uuidv4()
                    return (
                    <Grid item key={uid} xs={12}>
                      <p>{JSON.stringify(x)}</p>
                      <UpdateDeleteItem
                        formKey={i}
                        formName={uid}
                        defaultFieldSchema={nameSchema}
                        onDelete={handleNameDelete}
                        onUpdate={handleNamesUpdate}
                        values={x} />
                    </Grid>)
                  }
                  )}
                </Grid>
              </Grid>
            </Grid>
            <h2>{t("externDatabaseIds")}</h2>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                </Grid>
              </Grid>
            </Grid>
          </main>
          <hr/>
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