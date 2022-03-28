import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { permissionHelper } from '../../helpers/permission.helper'
import useAuth from '../../hooks/auth/useAuth'
import PaginationPageFooter from './PaginationPageFooter'
import PaginationPageHeader from './PaginationPageHeader'
import PaginationPageSearchBar from './PaginationPageSearchBar'
import AddIcon from '@mui/icons-material/Add';
import { FormikFieldSchema } from '../../types/common/component.types'
import { useTranslation } from 'react-i18next'

type Props = {
    children: any,
    title: string,
    canEditRoles: string[],
    rowsPerPageList: number[],
    totalRecords: number,
    searchBarFormSchema: FormikFieldSchema[],
    onAddNewClick?: () => void, 
    onQueryParameterChange: (queryParams: any) => void,
    onSearchSubmit?: (queryParams: any) => void,
    onSearchReset?: (queryParams: any) => void
}

const PaginationPageBase = (props: Props) => {
    const { 
        children, 
        title,
        canEditRoles, 
        rowsPerPageList, 
        totalRecords,
        searchBarFormSchema,
        onAddNewClick,
        onQueryParameterChange,
        onSearchSubmit,
        onSearchReset
    } = props;
    const {t} = useTranslation();
    const { auth } = useAuth();
    const [canEdit, setCanEdit] = useState(permissionHelper.hasRole(auth.roles, canEditRoles));
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageList[0]);
    const [searchQuery, setSearchQuery] = useState({});

    useEffect(() => {
        setCanEdit(permissionHelper.hasRole(auth.roles, canEditRoles));
    }, [auth])

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        const newPageValue = newPage + 1;
        const params = {
            pageNumber: newPageValue,
            pageSize: rowsPerPage,
            ...searchQuery
        }
        onQueryParameterChange(params)
        setPage(newPageValue);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newRowsPerPage = parseInt(event.target.value, 10); 
        const params = {
            pageNumber: 1,
            pageSize: newRowsPerPage,
            ...searchQuery
        }
        setRowsPerPage(newRowsPerPage);
        setPage(1);
        onQueryParameterChange(params)
    };

    const handleSearchSubmit = (values: any) => {
        setSearchQuery({ ...values })
        setPage(1);
        if (onSearchSubmit) {
            const params = {
                pageNumber: 1,
                pageSize: rowsPerPage,
                ...values
            }
            onSearchSubmit(params);
        }
    }

    const handleSearchReset = () => {
        setSearchQuery({})
        setPage(1);
        if (onSearchReset) {
            const params = {
                pageNumber: 1,
                pageSize: rowsPerPage,
                ...searchQuery
            }
            onSearchReset(params);
        }
    }

    return (
        <Grid container direction='column' spacing={2}>
            <Grid item xs={12}>
                <PaginationPageHeader title={title}>
                    {canEdit && onAddNewClick &&
                        <Grid item alignContent='center' xs={12}>
                            <Button 
                            variant="contained" 
                            color='success' 
                            onClick={onAddNewClick} 
                            startIcon={<AddIcon />}>{t('add')}</Button>
                        </Grid>}
                    <Grid item xs={12}>
                        <PaginationPageSearchBar
                            onSearchSubmit={handleSearchSubmit}
                            onSearchReset={handleSearchReset}
                            searchFields={searchBarFormSchema}
                        />
                    </Grid>
                </PaginationPageHeader>
            </Grid>
            <Grid item xs={12}>
                {children}
            </Grid>
            <Grid item xs={12}>
                <PaginationPageFooter
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalRecords={totalRecords}
                    rowsPerPageArray={rowsPerPageList}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage} />
            </Grid>
        </Grid>
    )
}

export default PaginationPageBase