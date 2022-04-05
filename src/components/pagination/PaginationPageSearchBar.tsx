import * as yup from 'yup';
import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search';
import FormikTextFields from '../common/FormikTextFields';
import { FormikFieldSchema } from '../../types/common/component.types';
import { useFormik } from 'formik';

type Props = {
    searchFields: FormikFieldSchema[],
    onSearchSubmit: (values: any) => void,
    onSearchReset: () => void,
}

const PaginationPageSearchBar = (props: Props) => {
    const { t } = useTranslation();
    const { searchFields, onSearchSubmit, onSearchReset } = props;
    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

    const validationSchema = yup.object(
        searchFields.reduce(((r, c) => Object.assign(r, { [c.name]: c.validationSchema })), {})
    )
    const initValues = searchFields.reduce(((r, c) => Object.assign(r, { [c.name]: c.initValue })), {})

    const handleSearchSubmit = (searchValues: any) => {
        if (formik.dirty) {
            const values = Object
                .keys(searchValues)
                .reduce(((r, key) => Object.assign(r, (searchValues[key] && { [key]: searchValues[key] }))), {})
            onSearchSubmit(values);
        }
    }

    const handleSearchReset = () => {
        onSearchReset();
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: validationSchema,
        onSubmit: handleSearchSubmit,
        onReset: handleSearchReset
    });

    const getTextFieldSize = () => {
        if (searchFields.length > 4) {
            return { xs: 3 }
        }
        return {xs: 6}
    }

    return (
        <form id="search-form" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Grid container direction={largeScreen ? "row" : "column"} spacing={2}>
                <Grid item xs>
                    <Grid container direction={largeScreen ? "row" : "column"} spacing={2}>
                        <FormikTextFields formik={formik} fields={searchFields} itemProps={getTextFieldSize()} />
                    </Grid>
                </Grid>
                <Grid item xs={1}>
                    <Grid container direction="column" justifyContent="center" alignContent="center" alignItems="center" justifyItems="center">
                        <IconButton color="primary" form="search-form" type="submit">
                            <SearchIcon />
                        </IconButton>
                        <Button form="search-form" type="reset" variant="text">{t('reset')}</Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

export default PaginationPageSearchBar