import * as React from 'react' ;

import { useAuth } from '../../contexts/auth';

import {
    Grid
} from '@mui/material' ;

import {
    Avatar,
    LabelDiv,
    ValueDiv,
    InformDiv,
    MainInform,
    PositionDiv,
    NameDiv
} from './Styles/Dashboard.styles';

import { positions } from '../../static/constants';

const Dashboard = () => {
    const {
        profile
    } = useAuth() ;

    React.useEffect(() => {
        console.log(profile) ;
    } , [profile]) ;

    return (
        <Grid container>
            <Grid item xs={6}>
                {
                    profile && <>
                        <MainInform>
                            <Avatar src={profile.profile_photo_url} />
                            <NameDiv>
                                {profile.name}
                            </NameDiv>
                            <PositionDiv >
                                {positions[profile.position]}
                            </PositionDiv>
                        </MainInform>
                        <InformDiv>
                            <LabelDiv >Name</LabelDiv>
                            <ValueDiv>{profile.name}</ValueDiv>
                        </InformDiv>
                        <InformDiv>
                            <LabelDiv >House Hold</LabelDiv>
                            <ValueDiv>{profile.house_hold}</ValueDiv>
                        </InformDiv>
                        <InformDiv>
                            <LabelDiv >Phone Number</LabelDiv>
                            <ValueDiv>{profile.phone_number}</ValueDiv>
                        </InformDiv>
                        <InformDiv>
                            <LabelDiv >Email</LabelDiv>
                            <ValueDiv>{profile.inform_email}</ValueDiv>
                        </InformDiv>
                        <InformDiv>
                            <LabelDiv >CAV</LabelDiv>
                            <ValueDiv>{profile.cav}</ValueDiv>
                        </InformDiv>
                    </>
                }
            </Grid>
        </Grid>
    )
}

export default Dashboard ;