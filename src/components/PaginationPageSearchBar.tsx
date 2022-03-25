import { Button, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PaginationSearchBarField } from '../types/entities/component.typs'

type Props = {
    searchFields: PaginationSearchBarField[],
    itemSize: number,
    onSearchSubmit: (values: any) => void,
    onSearchReset: () => void,
}

const PaginationPageSearchBar = (props: Props) => {
    const { t } = useTranslation();
    const { searchFields, itemSize, onSearchSubmit, onSearchReset } = props;
    const [searchValues, setSearchValue] = useState<PaginationSearchBarField[]>([...searchFields]);

    const handleValueChange = (key: number, value: string): void => {
        let currSearchValues = [...searchValues];
        currSearchValues[key] = { ...currSearchValues[key], value: value };
        setSearchValue(currSearchValues);
    }

    const handleSearchSubmit = () => {
        let values = {}
        searchValues.forEach(element => {
            values = Object.assign(values,
                element.value && { [element.name]: element.value }
            );
        });
        onSearchSubmit(values);
    }

    const handleSearchReset = () => {
        let values: PaginationSearchBarField[] = []
        searchValues.forEach(element => {
            values.push({ ...element, value: '' });
        });
        setSearchValue(values);
        onSearchReset();
    }

    return (
        <form>
            <Grid container spacing={2}>
                {searchValues.map((x, i) =>
                    <Grid item key={i} xs={itemSize}>
                        <TextField
                            fullWidth
                            value={x.value}
                            onChange={(e) => handleValueChange(i, e.target.value)}
                            label={t(x.labelTranslationKey)}
                            type={x.type}
                        />
                    </Grid>
                )}
                <Grid item display="flex" justifyContent="flex-end">
                    <Button onClick={handleSearchSubmit} variant="text">{t('search')}</Button>
                </Grid>
                <Grid item display="flex" justifyContent="flex-end">
                    <Button onClick={handleSearchReset} variant="text">{t('reset')}</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default PaginationPageSearchBar