import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import useInstitutionService from '../../hooks/institutions/useInstitutionService';
import usePersonService from '../../hooks/persons/usePersonService';
import { AuthorFormValues, FormikFieldSchema, SearchFieldSchema } from '../../types/common/component.types';
import { InstitutionNameEntity } from '../../types/institutions/entities.types';
import { PersonNameEntity } from '../../types/persons/entities.types';
import { clearObject, clearValues } from '../../utils/objects-utils';
import FormikTextFields from '../common/FormikTextFields';
import AutocompleteSearchWithPreview from '../itemPage/AutocompleteSearchWithPreview';

type Props = {
    formId: string,
    schema: FormikFieldSchema[],
    onSubmit: (values: AuthorFormValues, dirty: boolean) => void,
    onReset?: () => void,
    resetAfterSubmit?: boolean
    onChange?: (values: AuthorFormValues, dirty: boolean) => void,
    initPersonName: PersonNameEntity | null,
    initInstitutionName: InstitutionNameEntity | null
}

const AuthorForm = (props: Props) => {
    const { t } = useTranslation();
    const {
        schema,
        formId,
        initPersonName,
        initInstitutionName,
        onSubmit,
        onChange,
        onReset,
        resetAfterSubmit } = props;
    const { getPersonNames } = usePersonService();
    const { getInstitutionNames } = useInstitutionService();
    const [personName, setPersonName] = useState<PersonNameEntity | null>(initPersonName);
    const [institutionName, setInstitutionName] = useState<PersonNameEntity | null>(initInstitutionName);
    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

    const validationSchema = yup.object(
        schema.reduce(((r, c) => Object.assign(r, { [c.name]: c.validationSchema })), {})
    )
    const initValues = schema.reduce(((r, c) => Object.assign(r, { [c.name]: c.initValue })), {})

    const handleSubmit = (values: any) => {
        if (personName !== null && institutionName !== null) {
            const dirty = institutionName !== initInstitutionName || personName !== initPersonName || formik.dirty;
            const clearedValues = clearObject(values);
            onSubmit({
                ...clearedValues,
                personName,
                institutionName
            }, dirty)
            if (resetAfterSubmit) {
                setPersonName(initPersonName);
                setInstitutionName(initInstitutionName);
                formik.handleReset(null)
            }
        }
    }

    const handleReset = () => {
        onReset && onReset()
    }

    const authorSchema: SearchFieldSchema<PersonNameEntity> =
    {
        name: "name",
        labelTranslationKey: "author",
        initValue: null,
        initOptions: [],
        searchSettings: {
            equalComparison: (option: PersonNameEntity, value: PersonNameEntity) => option.id === value.id,
            optionLabel: (opt: PersonNameEntity) => opt.firstName + " " + opt.lastName + " (" + opt.personId + ")",
        }
    }

    const institutionSchema: SearchFieldSchema<InstitutionNameEntity> =
    {
        name: "name",
        labelTranslationKey: "institution",
        initValue: null,
        initOptions: [],
        searchSettings: {
            equalComparison: (option: InstitutionNameEntity, value: InstitutionNameEntity) => option.id === value.id,
            optionLabel: (opt: InstitutionNameEntity) => opt.name + " (" + opt.institutionId + ")",
        }
    }


    const handlePersonNameSelect = (item: PersonNameEntity | null) => {
        setPersonName(item);
        if (onChange) {
            const dirty = institutionName !== initInstitutionName || initPersonName !== item || formik.dirty;
            onChange(
                {
                    ...formik.values,
                    personName: item,
                    institutionName: institutionName
                },
                dirty
            )
        }
    }

    const handleInstitutionNameSelect = (item: InstitutionNameEntity | null) => {
        setInstitutionName(item)
        if (onChange) {
            const dirty = initInstitutionName !== item || personName !== initPersonName || formik.dirty;
            onChange(
                {
                    ...formik.values,
                    personName: personName,
                    institutionName: item
                },
                dirty
            )
        }
    }

    const handleFormChange = (value: any, newDirty: boolean) => {
        if (onChange) {
            const dirty = institutionName !== initInstitutionName || personName !== initPersonName || newDirty;
            onChange(
                {
                    ...value,
                    personName: personName,
                    institutionName: institutionName
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
                        onItemSelect={handlePersonNameSelect}
                        item={personName}
                        settings={authorSchema}
                        errorMessage={!personName ? t('isRequiredShe', { what: t('person') }) : null}
                        getItems={getPersonNames} />
                </Grid>
                <Grid item xs>
                    <AutocompleteSearchWithPreview
                        item={institutionName}
                        onItemSelect={handleInstitutionNameSelect}
                        settings={institutionSchema}
                        errorMessage={!institutionName ? t('isRequiredShe', { what: t('institution') }) : null}
                        getItems={getInstitutionNames} />
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

export default AuthorForm