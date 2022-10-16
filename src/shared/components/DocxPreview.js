import * as React from 'react' ;

import DocxFullScreen from './DocxFullScreen';
import FileViewer from '@nuzz78/react-file-viewer' ;
import { CustomErrorComponent } from 'custom-error';

import WordImage from '../../assets/Word.png' ;

import { v4 as uuidv4 } from 'uuid';

import FullscreenIcon from '@mui/icons-material/Fullscreen';

import {
    Box 
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        position : 'relative',

        paddingLeft : '0px !important',
        marginTop : '0px !important', 
        marginBottom : '0px !important',
        // whiteSpace: 'pre-wrap !important',
        fontSize : '15px !important',

        "& div" : {
            fontSize : '15px !important',
            padding : '0px !important'
        },
        "& ol" : {
            fontSize : '15px !important',
            margin : '0px !important',
            marginLeft : '5px !important',
            padding : '0px !important',
            paddingLeft : '10px !important'
        },
        "& li" : {
            fontSize : '15px !important',
            margin : '5px !important',
            padding : '0px !important'
        },
        "& ul" : {
            fontSize : '15px !important',
            margin : '0px !important',
            marginLeft : '5px !important',
            padding : '0px !important',
            paddingLeft : '10px !important'
        },
        "& p" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& h1" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& h2" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& h3" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& h4" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& h5" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& h6" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& span" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& img" : {
            width : 30,
            height : 30
        },

        display : 'flex', alignItems : 'center', justifyContent : 'center',
        overflow : 'hidden',
        color : 'black',

        width: props => props.width + 'px !important',
        height : props => props.height + 'px !important',

        "& .document-container" : {
            width : props => (props.width - 30 )+ 'px !important',
            height : props => ( props.height - 10 ) + 'px',
            overflowY : 'scroll',
            boxSizing : 'border-box !important',
            background : 'none !important',
            overflowX : 'hidden',
            boxSizing : 'border-box',
            margin : '0px !important',
            padding : 10,

            "&::-webkit-scrollbar-track" : {
                marginTop : '10px',
                marginBottom : '10px'
            },
          
        },
        "& .pg-viewer-wrapper" : {
            overflow : 'hidden'
        },
        "& .pg-viewer" : {
            position : 'static !important'
        },
    },
    iconDiv : {
        position : 'absolute',
        right : 20,
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

const DocxPreview = (props) => {

    const {
        previewUrl,
        forceHide
    } = props ;

    const classes = useStyles(props) ;
    const thisRef = React.useRef() ;

    const [open, setOpen] = React.useState(false) ;

    const handleOpen = () => {
        setOpen(true) ;
    }

    const handleClose = () => {
        setOpen(false) ;
    }

    const onError = (e) => {
        console.log(e) ;
    }

    return (
        <Box className={classes.root} key={uuidv4()} ref={thisRef} id={uuidv4()}>
        {
            !open && <>
               { previewUrl ? <FileViewer
                    fileType={'docx'}
                    filePath={previewUrl}
                    errorComponent={CustomErrorComponent}
                    onError={onError}
                    key={uuidv4()}
                /> : <img src={WordImage} width={100} height={100}/>}
            
                { previewUrl && <Box className={classes.iconDiv}
                    onClick={(e) => {
                        e.preventDefault();
                        handleOpen() ;
                    }}
                >
                    <FullscreenIcon />
                </Box>}
            </>
        }

        <DocxFullScreen 
            open={open}
            previewUrl={previewUrl}
            handleClose={handleClose}
        />
        </Box>
  );
} 

export default DocxPreview ;