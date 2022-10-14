import * as React from 'react' ;

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';
import { useTranslate } from '../../contexts/language' ;

import PaletteIcon from '@mui/icons-material/Palette';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';

import styled from 'styled-components';

import {
    Button
} from '../../shared/ui' ;

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
    IconButton,
    ListItem,
    useMediaQuery
} from '@mui/material';
import { eraseCookie } from '../../utils/Helper';

const Navbar = (props) => {
    const {
        handleClose
    } = props ;

    const theme = useTheme() ;
    const navigate = useNavigate() ;

    const match690 = useMediaQuery('(min-width : 690px)') ;

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

    const handleSignOut = () => {
        eraseCookie('user_id') ;
        navigate('/auth') ;
    }

    return (
        <NavbarMain>
            <LogoDiv 
                theme={theme}
            >
                {sysLang.logo}
            </LogoDiv>
            {
                !match690 && <CloseDiv>
                    <IconButton
                        onClick={handleClose}
                        color='success'
                    >
                        <CloseIcon/>
                    </IconButton>
                </CloseDiv>
            }
            <Divider />
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
                                    <Link to={nav.to}
                                        onClick={handleClose}
                                    >
                                        <NavItem>
                                            {nav.icon}
                                            {sysLang[nav.label]}
                                        </NavItem>
                                    </Link>
                                    {
                                        nav.subNavs ? nav.subNavs.map((subNav, index) => (
                                                <Link to={subNav.to} key={index}
                                                    onClick={handleClose}
                                                >
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
                {
                    !match690 && <ListItem>
                        <Button variant={'contained'}
                            onClick={handleSignOut}
                        >Sign Out</Button>
                    </ListItem>
                }
            </List>
        </NavbarMain>
    )
}

export default Navbar ;

const CloseDiv = styled.div`
    display : flex;
    justify-content : flex-end;

    padding-top : 10px;
    padding-right : 20px;
`