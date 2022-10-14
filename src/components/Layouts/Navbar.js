import * as React from 'react' ;

import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';

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

    const navList = [
        {
            to : '/arquivos/',
            label : 'Dashboard',
            icon : <PaletteIcon/>
        },
        {
            to : '/arquivos/staff',
            label : 'STAFF',
            icon : <ViewCompactIcon />,
            subNavs : [
                {
                    to : '/arquivos/staff/new-collaborator',
                    label : 'New Collaborator',
                    icon : <GroupAddIcon/>
                },
                {
                    to : '/arquivos/staff/view-collaborator',
                    label : 'View Callaborator',
                    icon : <RemoveRedEyeIcon/>
                },
                {
                    to : '/arquivos/staff/edit-collaborator',
                    label : 'Edit Collaborator',
                    icon : <AppRegistrationIcon />
                }
            ]
        },
        {
            to : '/arquivos/pending',
            label : 'Pending',
            icon : <PublishedWithChangesIcon/>
        },
        {
            to : '/arquivos/report',
            label : 'Report',
            icon : <AddBoxIcon/>
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
                                <div>
                                    <Link to={nav.to}>
                                        <NavItem>
                                            {nav.icon}
                                            {nav.label}
                                        </NavItem>
                                    </Link>
                                    {
                                        nav.subNavs ? nav.subNavs.map((subNav, index) => (
                                                <Link to={subNav.to} key={index}>
                                                    <SubNavItem>
                                                        {subNav.label}
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