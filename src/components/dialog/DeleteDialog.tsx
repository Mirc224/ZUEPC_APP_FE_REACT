import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
    fullScreen?: boolean,
    open?: boolean,
    dialogTitle?: string,
    onClose?: () => void,
    onConfirmation?: () => void,
}

const DeleteDialog = (props: Props) => {
    const {t} = useTranslation();
    const {fullScreen, open, dialogTitle, onClose, onConfirmation} = props;
  return (
      <Dialog
          fullScreen={fullScreen}
          open={open || false}
          onClose={onClose}
          aria-labelledby="responsive-dialog-title"
      >
          <DialogTitle id="responsive-dialog-title">
              {dialogTitle}
          </DialogTitle>
          <DialogContent>
              <DialogContentText>
                  {t('permanentAction')}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button autoFocus onClick={onClose}>
                  {t("close")}
              </Button>
              <Button onClick={onConfirmation} autoFocus color="error" variant="contained">
                  {t("delete")}
              </Button>
          </DialogActions>
      </Dialog>
  )
}

export default DeleteDialog