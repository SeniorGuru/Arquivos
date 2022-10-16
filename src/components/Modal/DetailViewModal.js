import * as React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { UpdateAccessRole, GetCollaborators, GetEmployees } from '../../redux/actions/user' ;

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import EventNoteIcon from '@mui/icons-material/EventNote';

import { positions } from '../../static/constants';

import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel } from '@mui/material';

import {
    MainInform,
    Avatar,
    NameDiv,
    PositionDiv,
    InformDiv,
    LabelDiv,
    ValueDiv,
} from './Styles/Modal.styles' ;

import { Button } from '../../shared/ui';

const DetailViewModal = (props) => {
    const {
        UpdateAccessRole,
        GetCollaborators,
        GetEmployees,

        open,
        handleClose,

        data,
        id,

        hiddenForm
    }  = props ;

    const [disabled_role, setDisabledRole] = React.useState(false) ;

    const handleUpdate = async () => {
        await UpdateAccessRole(id, !disabled_role) ;
        GetCollaborators() ;
        GetEmployees() ;
        handleClose() ;
    }

    React.useEffect(() => {
        setDisabledRole(!data?.enabled_role || false) ;
    }, [data]) ;

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
                    {
                        !hiddenForm && <FormControlLabel control={<Checkbox checked={disabled_role} 
                            onChange={(e) => setDisabledRole(e.target.checked)}
                        />} label="Disabled Access" />
                    }
                </MainInform>
                <InformDiv>
                    <LabelDiv > <AccountCircleIcon/> &nbsp;  Name</LabelDiv>
                    <ValueDiv>{data?.name}</ValueDiv>
                </InformDiv>
                <InformDiv>
                    <LabelDiv> <LocationOnIcon/> &nbsp; House Hold</LabelDiv>
                    <ValueDiv>{data?.house_hold}</ValueDiv>
                </InformDiv>
                <InformDiv>
                    <LabelDiv ><LocalPhoneIcon/> &nbsp; Phone Number</LabelDiv>
                    <ValueDiv>{data?.phone_number}</ValueDiv>
                </InformDiv>
                <InformDiv>
                    <LabelDiv ><EmailIcon/> &nbsp; Email</LabelDiv>
                    <ValueDiv>{data?.inform_email}</ValueDiv>
                </InformDiv>
                <InformDiv>
                    <LabelDiv ><EventNoteIcon/> &nbsp; CAV</LabelDiv>
                    <ValueDiv>{data?.cav}</ValueDiv>
                </InformDiv>
            </DialogContent>
            <Divider />
            <DialogActions>
                {
                    !hiddenForm && <Button variant='contained' onClick={handleUpdate}>Update</Button>
                }
                <Button variant='contained' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
DetailViewModal.propTypes = {
    UpdateAccessRole : PropTypes.func.isRequired,
    GetCollaborators : PropTypes.func.isRequired,
    GetEmployees : PropTypes.func.isRequired
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = {
    UpdateAccessRole,
    GetCollaborators,
    GetEmployees
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailViewModal) ;