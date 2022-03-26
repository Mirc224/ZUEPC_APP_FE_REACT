import { Dispatch, SetStateAction } from "react";

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

export interface PersonName {
    id? : number,
    personId?: number,
    firstName?: string,
    lastName?: string,
    nameType?: string
}