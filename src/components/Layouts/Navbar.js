import * as React from 'react' ;

import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';
import { useTranslate } from '../../contexts/language' ;

import PaletteIcon from '@mui/icons-material/Palette';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { 
    LogoDiv,
    NavbarMain,
    ProfileDiv,
    Avatar,
    NameDiv,
    PositionDiv,
    InfoDiv,
    NavItem,
    SubNavItem
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

    const {
        sysLang
    } = useTranslate() ;

    const navList = [
        {
            to : '/arquivos/',
            label : 'dashboard',
            icon : <PaletteIcon/>
        },
        {
            to : '/arquivos/staff',
            label : 'staff',
            icon : <ViewCompactIcon />,
            subNavs : [
                {
                    to : '/arquivos/staff/new-collaborator',
                    label : 'newcollaborator',
                    icon : <GroupAddIcon/>
                },
                {
                    to : '/arquivos/staff/view-collaborator',
                    label : 'viewcollaborator',
                    icon : <RemoveRedEyeIcon/>
                },
                {
                    to : '/arquivos/staff/edit-collaborator',
                    label : 'editcollaborator',
                    icon : <AppRegistrationIcon />
                }
            ]
        },
        {
            to : '/arquivos/pending',
            label : 'pending',
            icon : <PublishedWithChangesIcon/>
        },
        {
            to : '/arquivos/report',
            label : 'report',
            icon : <AddBoxIcon/>
        }
    ]

    return (
        <NavbarMain>
            <LogoDiv 
                theme={theme}
            >
                {sysLang.logo}
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
                                <div>
                                    <Link to={nav.to}>
                                        <NavItem>
                                            {nav.icon}
                                            {sysLang[nav.label]}
                                        </NavItem>
                                    </Link>
                                    {
                                        nav.subNavs ? nav.subNavs.map((subNav, index) => (
                                                <Link to={subNav.to} key={index}>
                                                    <SubNavItem>
                                                        {sysLang[subNav.label]}
                                                        {subNav.icon}
                                                    </SubNavItem>
                                                </Link>
                                        )) : <></>
                                    }
                                </div>
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