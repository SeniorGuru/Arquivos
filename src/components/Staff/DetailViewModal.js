import * as React from 'react' ;

import { positions } from '../../static/constants';

import { Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';

import {
    MainInform,
    Avatar,
    NameDiv,
    PositionDiv,
    InformDiv,
    LabelDiv,
    ValueDiv
} from './Styles/Modal.styles' ;

import { Button } from '../../shared/ui';

const DetailViewModal = (props) => {
    const {
        open,
        handleClose,

        data,
    }  = props ;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
        >
            <DialogTitle>
                {data?.name}
            </DialogTitle>
            <Divider />
            <DialogContent>
                <MainInform>
                    <Avatar src={data?.profile_photo_url} />
                    <NameDiv>
                        {data?.name}
                    </NameDiv>
                    <PositionDiv >
                        {positions[data?.position]}
                    </PositionDiv>
                </MainInform>
                <InformDiv>
                    <LabelDiv >Name</LabelDiv>
                    <ValueDiv>{data?.name}</ValueDiv>
                </InformDiv>
                <InformDiv>
                    <LabelDiv >House Hold</LabelDiv>
                    <ValueDiv>{data?.house_hold}</ValueDiv>
                </InformDiv>
                <InformDiv>
                    <LabelDiv >Phone Number</LabelDiv>
                    <ValueDiv>{data?.phone_number}</ValueDiv>
                </InformDiv>
                <InformDiv>
                    <LabelDiv >Email</LabelDiv>
                    <ValueDiv>{data?.inform_email}</ValueDiv>
                </InformDiv>
                <InformDiv>
                    <LabelDiv >CAV</LabelDiv>
                    <ValueDiv>{data?.cav}</ValueDiv>
                </InformDiv>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button variant='contained' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DetailViewModal ;