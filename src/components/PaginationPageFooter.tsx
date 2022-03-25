import { Grid, TablePagination } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
    totalRecords: number,
    page: number,
    rowsPerPage: number,
    rowsPerPageArray: number[],
    onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void,
    onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => void
}

const PaginationPageFooter = (props: Props) => {
    const { totalRecords, page, rowsPerPage, rowsPerPageArray, onChangePage, onChangeRowsPerPage} = props;
    const {t} = useTranslation();

  return (
      <footer>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                  <TablePagination
                      showFirstButton
                      showLastButton
                      component='div'
                      count={totalRecords}
                      page={page - 1}
                      rowsPerPageOptions={rowsPerPageArray}
                      onPageChange={onChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={onChangeRowsPerPage}
                      labelRowsPerPage={t('rowsPerPage')}
                  />
              </Grid>
          </Grid>
      </footer>
  )
}

export default PaginationPageFooter