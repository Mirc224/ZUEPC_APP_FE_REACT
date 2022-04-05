import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
    const {t} = useTranslation();

    useEffect(() => {
        document.title = title;
        return () => {
        }
    }, [t])
    
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