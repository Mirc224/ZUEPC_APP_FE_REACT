import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search';
import SubmitResetForm from '../SubmitResetForm';
import { FormikFieldSchema } from '../../types/common/component.types';

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

    const handleSearchSubmit = (searchValues: any, dirty: boolean) => {
        if (dirty) {
            const values = Object
                .keys(searchValues)
                .reduce(((r, key) => Object.assign(r, (searchValues[key] && { [key]: searchValues[key] }))), {})
            onSearchSubmit(values);
        }
    }

    const handleSearchReset = () => {
        onSearchReset();
    }

    return (
        <Grid container direction={largeScreen ? "row" : "column"} spacing={2} alignItems="center">
            <Grid item xs>
                <SubmitResetForm onSubmit={handleSearchSubmit} onReset={handleSearchReset} fields={searchFields} formId="search-form" direction="row" />
            </Grid>
            <Grid item xs={1} alignItems="center" >
                <IconButton color="primary" form="search-form" type="submit">
                    <SearchIcon />
                </IconButton>
                <Button form="search-form" type="reset" variant="text">{t('reset')}</Button>
            </Grid>
        </Grid>
    )
}

export default PaginationPageSearchBar