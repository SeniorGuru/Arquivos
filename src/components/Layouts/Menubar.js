import * as React from 'react' ;

import { useNavigate } from 'react-router-dom';

import { eraseCookie } from '../../utils/Helper';

import {
    Button
} from '../../shared/ui' ;

import {
    MenubarMain
} from './Styles/Menubar.styles' ;

import { useTheme } from '@mui/styles';

const Menubar = () => {
    const theme = useTheme() ;

    const navigate = useNavigate() ;

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
            >Sign Out</Button>
        </MenubarMain>
    )
}

export default Menubar ;