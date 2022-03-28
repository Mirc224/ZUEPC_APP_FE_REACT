export interface PaginationSearchBarField {
    value: string,
    labelTranslationKey: string,
    type: string,
    name: string
}

export interface FormikFieldSchema {
    name: string,
    labelTranslationKey?: string,
    validationSchema?: any,
    type: string,
    initValue: any,
    fieldProps?: any
}


export interface ZUEPCEntityBase {
    id?: number
}

export interface ChangeableItem<T> {
    changed: boolean,
    item: T
}