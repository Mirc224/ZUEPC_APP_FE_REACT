import * as yup from 'yup';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import usePublicationService from '../../hooks/publications/usePublicationService'
import { FormikFieldSchema, RelatedPublicationFormValues, SearchFieldSchema } from '../../types/common/component.types'
import { PublicationNameEntity } from '../../types/publications/entities.types'
import { clearObject } from '../../utils/objects-utils';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import AutocompleteSearchWithPreview from '../itemPage/AutocompleteSearchWithPreview';
import FormikTextFields from '../common/FormikTextFields';

type Props = {
    formId: string,
    schema: FormikFieldSchema[],
    onSubmit: (values: RelatedPublicationFormValues, dirty: boolean) => void,
    onReset?: () => void,
    resetAfterSubmit?: boolean
    onChange?: (values: RelatedPublicationFormValues, dirty: boolean) => void,
    initPublicationName: PublicationNameEntity | null,
}

const RelatedPublicationForm = (props: Props) => {
    const { t } = useTranslation();
    const {
        schema,
        formId,
        initPublicationName,
        onSubmit,
        onChange,
        onReset,
        resetAfterSubmit } = props;
    const { getPublicationNames } = usePublicationService();
    const [publicationName, setPublicationName] = useState<PublicationNameEntity | null>(initPublicationName);
    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

    const validationSchema = yup.object(
        schema.reduce(((r, c) => Object.assign(r, { [c.name]: c.validationSchema })), {})
    )
    const initValues = schema.reduce(((r, c) => Object.assign(r, { [c.name]: c.initValue })), {})

    const handleSubmit = (values: any) => {
        if (publicationName !== null) {
            const dirty = publicationName !== initPublicationName || formik.dirty;
            const clearedValues = clearObject(values);
            onSubmit({
                ...clearedValues,
                relatedPublicationName: publicationName,
            }, dirty)
            if (resetAfterSubmit) {
                setPublicationName(initPublicationName);
                formik.handleReset(null)
            }
        }
    }

    const handleReset = () => {
        onReset && onReset()
    }

    const relatedPublicationSchema: SearchFieldSchema<PublicationNameEntity> =
    {
        name: "name",
        initValue: null,
        initOptions: [],
        searchSettings: {
            equalComparison: (option: PublicationNameEntity, value: PublicationNameEntity) => option.id === value.id,
            optionLabel: (opt: PublicationNameEntity) => opt.name + " (" + opt.publicationId + ")",
        }
    }

    const handlePublicationNameSelect = (item: PublicationNameEntity | null) => {
        setPublicationName(item);
        if (onChange) {
            const dirty = initPublicationName !== item || formik.dirty;
            onChange(
                {
                    ...formik.values,
                    relatedPublicationName: item,
                },
                dirty
            )
        }
    }

    const handleFormChange = (value: any, newDirty: boolean) => {
        const dirty = publicationName !== initPublicationName || newDirty;
        if (onChange) {
            onChange(
                {
                    ...value,
                    relatedPublicationName: publicationName
                },
                dirty
            )
        }
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
        onReset: handleReset
    });

    return (
        <form id={formId} onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Grid container direction={largeScreen ? "row" : "column"} spacing={2} >
                <Grid item xs>
                    <AutocompleteSearchWithPreview
                        onItemSelect={handlePublicationNameSelect}
                        item={publicationName}
                        settings={relatedPublicationSchema}
                        errorMessage={!publicationName ? t('isRequiredShe', { what: t('publication') }) : null}
                        getItems={getPublicationNames} />
                </Grid>
                <FormikTextFields
                    formik={formik}
                    fields={schema}
                    onValueChange={handleFormChange}
                />
            </Grid>
        </form>
    )
}

export default RelatedPublicationForm