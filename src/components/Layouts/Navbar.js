import * as React from 'react' ;

import { useAuth } from '../../contexts/auth';

import PaletteIcon from '@mui/icons-material/Palette';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';

import { 
    LogoDiv,
    NavbarMain,
    ProfileDiv,
    Avatar,
    NameDiv,
    PositionDiv,
    InfoDiv,
    NavItem
} from './Styles/Navbar.styles';

import { useTheme } from '@mui/styles';

import {
    Divider,
    List,
    ListItem
} from '@mui/material';

const Navbar = () => {
    const theme = useTheme() ;

    const {
        profile
    } = useAuth() ;

    const navList = [
        {
            to : '/arquivos/',
            label : 'Dashboard',
            icon : <PaletteIcon/>
        },
        {
            to : '/arquivos',
            label : 'STAFF',
            icon : <ViewCompactIcon />
        }
    ]

    return (
        <NavbarMain>
            <LogoDiv 
                theme={theme}
            >
                Company X
            </LogoDiv>
            {
                profile && <ProfileDiv>
                    <Avatar src={profile.profile_photo_url} />
                    <InfoDiv>
                        <NameDiv>
                            {profile.name}
                        </NameDiv>
                        <PositionDiv>
                            {profile.position}
                        </PositionDiv>
                    </InfoDiv>
                </ProfileDiv>
            }
            <List>
                <Divider />
                {
                    navList.map((nav, index) => (
                        <div key={index}>
                            <ListItem>
                                <NavItem>
                                    {nav.icon}
                                    {nav.label}
                                </NavItem>
                            </ListItem>
                            <Divider />
                        </div>
                    ))
                }
            </List>
        </NavbarMain>
    )
}

export default Navbar ;