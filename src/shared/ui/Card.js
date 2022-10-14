import * as React from 'react' ;

import { useTranslate } from '../../contexts/language';

import styled from 'styled-components' ;

import { useTheme } from '@mui/styles';

import { Typography } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const Card = (props) => {
    const theme = useTheme() ;

    const {
        sysLang
    } = useTranslate() ;

    const {
        color, cnt, label,
        onClick
    } = props ;

    return (
        <CardMain
            backgroundColor={theme.palette[color].main}
        >
            <CardBody>
                <InnerDiv>
                    <Typography variant='h3'>{cnt}</Typography>
                    <LabelDiv>{label}</LabelDiv>
                </InnerDiv>
                <IconDiv>
                    <PersonIcon />
                </IconDiv>
            </CardBody>
            <CardFooter
                onClick={onClick}
            >
                {sysLang['access']} &nbsp; <ArrowCircleRightIcon/>
            </CardFooter>
        </CardMain>
    )
}

export default Card ;

const CardMain = styled.div`
    background : ${props => props.backgroundColor} ;
    color : white ;

    width : 200px ;
    height : fit-content;
`
const CardBody = styled.div`
    display : flex;
    justify-content : space-between;
    align-items : center;
    padding : 10px;
`

const CardFooter = styled.div`
    display : flex;
    justify-content : center;
    cursor : pointer;
    background : rgba(0, 0, 0, 0.1) ;
    transition : 0.2s;

    &:hover {
        background : rgba(0,0,0,0.15);
    }

    padding : 5px;
`

const InnerDiv = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-around;
`

const LabelDiv = styled.div`

`

const IconDiv = styled.div`
    & svg {
        color : rgba(0, 0, 0, 0.15) ;
        font-size : 60px;
        transition : 0.2s;

        cursor : pointer;

        &:hover {
            transform : scale(1.4, 1.4);
        }
    }
`