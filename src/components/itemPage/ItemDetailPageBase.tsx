import { Container, DialogTitle } from '@mui/material';
import React, { Children } from 'react'
import LoadingScreen from '../common/LoadingScreen';
import DeleteDialog from '../dialog/DeleteDialog';
import ItemPageHeader from './ItemPageHeader';

type Props = {
    
    title: string,
    isLoading: boolean,
    onClickEdit?: () => void,
    onClickDelete?: () => void,
    dialogTitle?: string,
    dialogIsOpen?: boolean,
    dialogFullScreen?: boolean,
    onDialogClose?: () => void,
    onDialogConfirm?: () => void,
    children: any,
}

const ItemDetailPageBase = (props: Props) => {
    const {
        title, 
        isLoading,
        onClickEdit,
        onClickDelete,
        children,
        dialogTitle,
        dialogIsOpen, 
        dialogFullScreen,
        onDialogClose,
        onDialogConfirm
    } = props;
  return (
      <article>
          {isLoading 
              ?
              <LoadingScreen isLoading={isLoading} />
              :
              <Container>
                  <ItemPageHeader
                      title={title}
                      onClickEdit={onClickEdit}
                      onClickDelete={onClickDelete}
                  />
                  <main>
                      {children}
                  </main>
              </Container>}
          <DeleteDialog
              fullScreen={dialogFullScreen}
              open={dialogIsOpen}
              dialogTitle={dialogTitle}
              onClose={onDialogClose}
              onConfirmation={onDialogConfirm} />
      </article>
  )
}

export default ItemDetailPageBase