import { InstitutionNameEntity } from "../institutions/entities.types"
import { PersonNameEntity } from "../persons/entities.types"

export interface PaginationSearchBarField {
    value: string,
    labelTranslationKey: string,
    type: string,
    name: string
}

export interface FormikFieldSchema{
    name: string,
    labelTranslationKey?: string,
    validationSchema?: any,
    type: string,
    initValue: any,
    fieldProps?: any,
}

export interface SearchFieldSchema<T> {
    name: string,
    onRemove: () => void
    onChangeSelected?: (e: any, val: T | null) => void,
    onChangeInput?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    labelTranslationKey?: string,
    initValue: any,
    initOptions: T[],
    searchSettings: AutocompleteSearchSettings<T>
}

export interface ZUEPCEntityBase {
    id?: number
}

export interface ChangeableItem<T> {
    changed: boolean,
    item: T
}

export interface AutocompleteSearchSettings<T> {
    equalComparison: (option: T, value: T) => boolean,
    optionLabel: (opt: T) => string,
}

export interface AuthorFormValues {
    contributionRatio?: number,
    role?: string,
    personName: PersonNameEntity | null,
    institutionName: InstitutionNameEntity | null
}