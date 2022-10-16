import React from 'react' ;

// Core viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';

import {
    Box,
    Avatar,
    IconButton
} from '@mui/material' ;

import CloseIcon from '@mui/icons-material/Close';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        display : props => props.open ? 'flex' : 'none',
        position : 'fixed',
        zIndex : 5555,

        alignItems : 'center !important',
        width : '100vw',
        height : '100vh',

        left : 0 , top : 0,

        backdropFilter : 'blur(4px)',

        "& .MuiSvgIcon-root" : {
            marginRight : 10
        },
        "& .rpv-core__inner-page" : {
            minHeight : '100vh !important',
        },
    },
    closeButtonDiv : {
        position: 'fixed !important',
        zIndex : 100,
        left : 20,
        top : 20,

        height : 50,
        width : 50,

        display : 'flex !important', alignItems : 'center', justifyContent: 'center !important',
        background : '#286e452b !important',

        "& svg" : {
            color : theme.palette.green.G200,
            margin : '0px !important',
            fontSize : 40
        }
    }
})) ;

const PdfFullScreen = (props) => {
    const classes = useStyles(props) ;

    return (
        <Box className={classes.root}>
            <IconButton className={classes.closeButtonDiv} onClick={() => props.handleClose()} color={'success'} >
                <CloseIcon />
            </IconButton>
            {
                props.previewUrl && 
                <Worker workerUrl={pdfjsWorker}>
                    <Viewer
                        fileUrl={props.previewUrl}
                    />
                </Worker>
            }
            
        </Box>
    )
}

export default PdfFullScreen ;