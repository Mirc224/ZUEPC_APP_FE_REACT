import { Autocomplete, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import _, { debounce } from 'lodash';
import React, { ReactNode, useEffect, useState } from 'react'
import _default from 'yup/lib/locale';
import usePersonService from '../../hooks/persons/usePersonService';
import { PersonNameEntity, PersonPreviewEntity } from '../../types/persons/entities.types';
import { clearObject } from '../../utils/objects-utils';

type Props = {}

const PublicationCreate = (props: Props) => {
    const { getPersonNames } = usePersonService();
    const [jsonResults, setJsonResults] = useState<PersonNameEntity[]>([]);
    const [searchValue, setSearchValue] = useState({});

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        getPersonNames({
            signal: controller.signal,
            params: {...searchValue}
        })
            .then((response) => {
                isMounted && setJsonResults(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
        return () => {
        }
    }, [searchValue])

    const updateQuery = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = clearObject({ [e.target.name]: e.target.value })
        setSearchValue(val)
    }
    const debouncedOnChange = _.debounce(updateQuery, 500);


    return (
        <Stack>
            <Autocomplete
                id='items'
                getOptionLabel={(opt: PersonNameEntity) => `${opt.firstName} ${opt.lastName}`}
                options={jsonResults}
                renderOption={(props, opt: any) => (
                    <Box component="li" {...props} key={opt.id}>
                        {opt.firstName} {opt.lastName} ({opt.personId})
                    </Box>
                )}
                renderInput={(params) => <TextField {...params} name="name" onChange={debouncedOnChange}
                    label="Search for name" />} />
            <p>{JSON.stringify(jsonResults)}</p>
        </Stack>
    )
}

export default PublicationCreate