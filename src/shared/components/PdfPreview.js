import * as React from 'react' ;

// Core viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';

import FullscreenIcon from '@mui/icons-material/Fullscreen';

import PdfFullScreen from './PdfFullScreen';

import {
    Box,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        position : 'relative',
        boxSizing : 'border-box',
        width : 300,
        height : 300,
    },
    iconDiv : {
        position : 'absolute',
        right : 10,
        bottom : 0,
        "& .MuiSvgIcon-root" : {
            color : 'black',
            fontSize : 40,
            cursor : 'pointer',

            "&:hover" :{
                color :'red'
            }
        }
    }
})) ;

const PdfPreview = (props) => {

    const classes = useStyles(props) ;

    const [open, setOpen] = React.useState(false) ;

    const handleOpen = () => {
        setOpen(true) ;
    }
    
    const handleClose = () => {
        setOpen(false) ;
    }

    return (
        <Box className={classes.root}>
            {
                 
                props.previewUrl && <Worker workerUrl={pdfjsWorker}>
                     <Viewer
                         fileUrl={props.previewUrl}
                     />
                 </Worker>
            }
            {
                props.previewUrl && <Box className={classes.iconDiv}
                    onClick={(e) => {
                        e.preventDefault();
                        handleOpen() ;
                    }}
                >
                    <FullscreenIcon />
                </Box>
            }
            {
                <PdfFullScreen 
                    open={open}
                    previewUrl={props.previewUrl}
                    handleClose={handleClose}
                />
            }
        </Box>
    )
}

export default PdfPreview ;