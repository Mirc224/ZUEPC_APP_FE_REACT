import { Backdrop, Box, Button, CircularProgress, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, speedDialIconClasses, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import UploadIcon from '@mui/icons-material/Upload';
import ItemPageHeader from '../../components/itemPage/ItemPageHeader';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import useImportService from '../../hooks/import/useImportService';

type Props = {}

const Import = (props: Props) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorsMessages, setErrorMessages] = useState<string[]>([]);;
    const [myFiles, setMyFiles] = useState<FileWithPath[]>([]);
    const [source, setSource] = useState('');
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const { uploadFile } = useImportService();
    
    const onDrop = useCallback((acceptedFiles: any) => {
        setMyFiles([...myFiles, ...acceptedFiles])
    }, [myFiles])



    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: '.ISO,.xml'
    });

    const handleChange = (event: any) => {
        setSource(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleDeleteFile = (index: number) => {
        setMyFiles([]);
    }

    const handleSubmit = () => {
        setIsProcessing(true);
        const params = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        let formData = new FormData();
        formData.append('file', myFiles[0])
        uploadFile(source, formData, params)
            .then((response) => {
                setMyFiles([]);
                setIsProcessing(false);
            })
            .catch((err: any) => {
                if (err?.response?.status === 422) {
                    setErrorMessages(['notValidXmlDocument']);
                }
                setIsProcessing(false);
            })
    }

    useEffect(() => {
        setErrorMessages([])
        return () => {
        }
    }, [myFiles, source])


    const files = myFiles.map((file: FileWithPath, i) => (
        <Typography key={i} component="h6" variant="h6" textAlign="center">
            <IconButton color="error" onClick={() => handleDeleteFile(i)}>
                <ClearIcon />
            </IconButton>
        </Typography>
    ));

    const errorMsgs = errorsMessages.map((errorMsg: string, i) => (
        <Typography key={i} component="h6" variant="h6" textAlign="center" color="error">
            {t(errorMsg)}
        </Typography>
    ));
    
    return (
        <Container>
            <ItemPageHeader
                title={t('import')}
            />
            <main>
                <Grid container direction="column" justifyContent="center">
                    {myFiles.length === 0 ?
                        <Grid item xs={12}>
                            <Box {...getRootProps({ className: 'dropzone' })}

                                component="div"
                                sx={{ m: 4, p: 2, border: '2px dashed grey' }}>
                                <Grid container direction="column" alignContent="center">
                                    <Grid item>
                                        <IconButton>
                                            <UploadIcon sx={{ fontSize: "8em" }} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Typography component="h4" variant="h4" textAlign="center">
                                            {`${t('upload')} ${t('file').toLowerCase()}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <input {...getInputProps()} />
                            </Box>
                        </Grid>
                        :
                        <Grid item xs>
                            {files}
                        </Grid>}
                    <Grid item xs>
                        <Grid container
                            direction="column"
                            alignContent="center"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item xs>
                                <FormControl sx={{ minWidth: 120 }}>
                                    <InputLabel id="import-source-select">{t('source')}</InputLabel>
                                    <Select
                                        labelId="import-source-select"
                                        open={open}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        value={source}
                                        label={t('source')}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value='crepc'>CREPC</MenuItem>
                                        <MenuItem value='dawinci'>DaWinci</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {errorsMessages.length > 0 &&
                                <Grid item xs>
                                    {errorMsgs}
                                </Grid>
                            }
                            <Grid item xs>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={handleSubmit}
                                    disabled={!(source && myFiles.length > 0)}
                                >
                                    {t('submit')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </main>
            {isProcessing &&
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isProcessing}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>}
        </Container >

    );
}
//
export default Import