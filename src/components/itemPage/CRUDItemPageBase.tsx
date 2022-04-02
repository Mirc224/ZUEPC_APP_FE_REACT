import { Backdrop, Box, Button, CircularProgress, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingScreen from '../common/LoadingScreen';
import ItemPageHeader from './ItemPageHeader';

type Props = {
    title: string,
    wholeFormId: string,
    isProcessing?: boolean,
    isLoading?: boolean,
    children: any,
}

const CRUDItemPageBase = (props: Props) => {
    const {t} = useTranslation();
    const {
        title,
        wholeFormId,
        isProcessing,
        isLoading,
        children
    } = props;

    useEffect(() => {
        document.title = title;
        return () => {
        }
    }, [t])

    return (
        <>
            {isLoading
                ?
                <LoadingScreen isLoading={isLoading} />
                :
                <Box>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <ItemPageHeader title={title} />
                        </Grid>
                        <Grid item xs={12}>
                            <main>
                                {children}
                            </main>
                            <hr />
                        </Grid>
                        <Grid item xs={2}>
                            <footer>
                                <Button form={wholeFormId} color="primary" variant="contained" fullWidth type="submit">
                                    {t("submit")}
                                </Button>
                            </footer>
                        </Grid>
                    </Grid>
                    {isProcessing &&
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isProcessing}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>}
                </Box >}
        </>
    )
}

export default CRUDItemPageBase