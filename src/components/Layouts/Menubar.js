import * as React from 'react' ;

import { useTranslate } from '../../contexts/language';
import { useNavigate } from 'react-router-dom';

import { eraseCookie } from '../../utils/Helper';

import MenuIcon from '@mui/icons-material/Menu';

import TranslateIcon from '@mui/icons-material/Translate';

import MobileNavbar from './MobileNavbar';

import {
    IconButton,
    MenuItem,
    useMediaQuery
} from '@mui/material' ;

import {
    Button,
    Select
} from '../../shared/ui' ;

import {
    MenubarMain,
    TranlationGroup
} from './Styles/Menubar.styles' ;

import { useTheme } from '@mui/styles';

const Menubar = () => {
    const theme = useTheme() ;

    const match690 = useMediaQuery('(min-width : 690px)');

    const navigate = useNavigate() ;

    const languageList = {
        "en" : "English",
        "po" : "Portuguese"
    }

    const {
        langOpts,
        sysLang,
        onChangeLanguage
    } = useTranslate() ;
    
    const [open, setOpen] = React.useState(false) ;
    const [selectedOpt, setSelectedOpt] = React.useState('en') ;

    const handleOpen = () => {
        setOpen(true) ;
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleChangeLanguage = (e) => {
        setSelectedOpt(e.target.value) ;
        onChangeLanguage(e.target.value);
    }

    const handleSignOut = () => {
        eraseCookie('user_id') ;
        navigate('/auth') ;
    }
    
    return (
        <MenubarMain
            theme={theme}
        >
            <Button variant='contained' color='secondary' sx={{fontWeight:'bold'}}
                onClick={handleSignOut}
            >{sysLang['signout']}</Button>
            <TranlationGroup>
                <Select
                    value={selectedOpt}
                    onChange={handleChangeLanguage}
                    size='small'
                >
                    {
                        langOpts && langOpts.map(opt => (
                            <MenuItem value={opt} key={opt}>{languageList[opt]}</MenuItem>
                        ))
                    }
                </Select>
                <TranslateIcon />
            </TranlationGroup>
            {
                !match690 && <IconButton color='danger'
                    onClick={handleOpen}
                >
                    <MenuIcon />
                </IconButton>
            }

            <MobileNavbar 
                open={open}
                handleClose={handleClose}
            />
        </MenubarMain>
    )
}

export default Menubar ;
