import * as React from 'react' ;

import { useNavigate } from 'react-router-dom';

import { eraseCookie } from '../../utils/Helper';

import TranslateIcon from '@mui/icons-material/Translate';

import {
    MenuItem
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
import { useTranslate } from '../../contexts/language';

const Menubar = () => {
    const theme = useTheme() ;

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

    const [selectedOpt, setSelectedOpt] = React.useState('en') ;

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
        </MenubarMain>
    )
}

export default Menubar ;