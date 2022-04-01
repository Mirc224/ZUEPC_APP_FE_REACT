import { Autocomplete, Box, Grid, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SearchFieldSchema } from '../../types/common/component.types'
import { AxiosResponse } from 'axios';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { clearObject } from '../../utils/objects-utils';
import { debounce } from 'lodash';

type Props<T> = {
    getItems: (params: any) => Promise<AxiosResponse<any,any>>,
    item: T | null,
    settings: SearchFieldSchema<T>,
    errorMessage?: string | null,
    onItemSelect: (item: T|null) => void
}

const AutocompleteSearchWithPreview = <T extends object>(props: Props<T>) => {
    const { t } = useTranslation();
    const { settings, item, errorMessage, getItems, onItemSelect} = props;
    const [options, setOptions] = useState<T[]>(item ? [item] : []);
    const _isMounted = useRef(true);

    useEffect(() => {
      
    
      return () => {
        _isMounted.current = false;
      }
    }, [])
    

    const getItemOptions = (params: any) => {
        getItems({
            params: { ...params }
        })
            .then((response: any) => {
                setOptions(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const updateItemQuery = debounce((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = clearObject({ [e.target.name]: e.target.value.trim() })
        getItemOptions(val);
    }, 500)

    const handleChangeSelected = (e: any, val: T| null) => {
        onItemSelect(val);
        settings.onChangeSelected && settings.onChangeSelected(e, val);
    }

    const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateItemQuery(e);
        settings.onChangeInput && settings.onChangeInput(e);
    }

    return (
        <Grid container alignItems="center">
            <Grid item xs>
                <Autocomplete
                    onChange={handleChangeSelected}
                    getOptionLabel={settings.searchSettings.optionLabel}
                    isOptionEqualToValue={settings.searchSettings.equalComparison}
                    options={options}
                    value={item}
                    renderOption={(props, opt: any) => (
                        <Box component="li" {...props} key={opt.id}>
                            {settings.searchSettings.optionLabel(opt)}
                        </Box>
                    )}
                    renderInput={(params) =>
                        <TextField {...params}
                            disabled={item ? true: false}
                            name={settings.name}
                            helperText={errorMessage ? errorMessage : null}
                            onChange={handleChangeInput}
                            label={t(settings.labelTranslationKey
                                ? settings.labelTranslationKey
                                : settings.name)} />}
                />
            </Grid>
        </Grid>
    )
}

export default AutocompleteSearchWithPreview