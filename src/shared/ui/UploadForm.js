import {
    InputLabel,
} from '@mui/material' ;

import { withStyles } from '@mui/styles' ;

import styled from 'styled-components' ;

export default styled.div`
    max-width : 400px;
    padding : 10px;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column ;
    gap : 10px;
    border : 1px solid black;
    border-radius : 10px;
`

export const UploadInput = withStyles((theme) => ({
    root : {
        "& svg" : {
            color : theme.palette.green.G200
        },
        color : theme.palette.green.G200,
    
        display : 'flex', 
        flexDirection : 'column', 
        alignItems : 'center', 
        justifyContent :"center", 
        gap : 5,
        
        cursor : 'pointer',

        "& img" : {
            width : '100%'
        }
    }
}))(InputLabel) ;