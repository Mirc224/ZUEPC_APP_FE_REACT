import { Button, Container, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

type Props = {}

// export interface CreatePersonWithDetailsCommand {
//   birthYear?: number,
//   deathYear?: number,
//   names?: PersonNameCreateDto[],
//   externDatabaseIds?: PersonExternDatabaseIdCreateDto[],
// }

interface FormikFieldSchema {
  name: string,
  validationSchema: any,
  type: string,
  initValue: any
}

const PersonCreate = (props: Props) => {
  const { t } = useTranslation();
  const validationSchema = yup.object({
    birthYear: yup
      .number()
      .typeError('mustBeNumber')
      .nullable(true),
    deathYear: yup
      .number()
      .typeError('mustBeNumber')
      .nullable(true),
  });


  const schema: FormikFieldSchema[] = [
    {
      name: "birthYear",
      validationSchema: (yup
        .number()
        .typeError('mustBeNumber')
        .nullable(true)),
      type: "text",
      initValue: "toto je ono"
    },
    {
      name: "deathYear",
      validationSchema: (yup
        .number()
        .typeError('mustBeNumber')
        .nullable(true)),
      type: "text",
      initValue: "hehe"
    },
  ]

  const initValues = schema.reduce(((r, c) => Object.assign(r, { [c.name]: c.initValue })), {})

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: validationSchema,
    onSubmit: onSubmitRegister
  });

  async function onSubmitRegister(values: any) {
    console.log("tu")
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
                  <Grid container spacing={2}>
                    {schema.map((x, i) =>
                      <Grid key={i} item xs={12}>
                        <TextField
                          fullWidth
                          name={x.name}
                          label={t(x.name)}
                          value={(formik.values as any)[x.name]}
                          onChange={formik.handleChange}
                          error={(formik.touched as any)[x.name] && Boolean((formik.errors as any)[x.name])}
                          helperText={
                            (formik.touched as any)[x.name] &&
                              (formik.errors as any)[x.name] ?
                              t((formik.errors as any)[x.name], { what: t(x.name) }) : null}
                        />
                      </Grid>
                    )}
                    <Button color="primary" variant="contained" fullWidth type="submit" onClick={() => formik.handleSubmit()}>
                      {t("submit")}
                    </Button>
                    <p>{JSON.stringify(formik.values)}</p>
                    {/* <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="birthYear"
                        name="birthYear"
                        label={t("birthYear")}
                        value={formik.values.birthYear}
                        onChange={formik.handleChange}
                        error={formik.touched.birthYear && Boolean(formik.errors.birthYear)}
                        helperText={
                          formik.touched.birthYear &&
                            formik.errors.birthYear ?
                            t(formik.errors.birthYear, { what: t('birthYear') }) : null}
                      />
                    </Grid> */}
                    {/* <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="deathYear"
                        name="deathYear"
                        label={t("deathYear")}
                        value={formik.values.deathYear}
                        onChange={formik.handleChange}
                        error={formik.touched.deathYear && Boolean(formik.errors.deathYear)}
                        helperText={
                          formik.touched.deathYear &&
                            formik.errors.deathYear ?
                            t(formik.errors.deathYear, { what: t('deathYear') }) : null}
                      />
                    </Grid> */}
                  </Grid>
                </Container>
              </Grid>
            </Grid>
            <h2>{t("name")}</h2>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>

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
        </Grid>
        <Grid item xs={2}>
          <footer>
            {/* <Button color="primary" variant="contained" fullWidth type="submit">
              {t("submit")}
            </Button> */}
          </footer>
        </Grid>
      </Grid>
    </Container >
  )
}

export default PersonCreate