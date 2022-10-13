import * as React from 'react' ;

import {
    MenubarMain
} from './Styles/Menubar.styles' ;

import { useTheme } from '@mui/styles';

const Menubar = () => {
    const theme = useTheme() ;

    return (
        <MenubarMain
            theme={theme}
        >
        </MenubarMain>
    )
}

export default Menubar ;