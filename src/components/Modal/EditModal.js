import * as React from 'react' ;

import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { GetCollaborators, UpdateCollaborator } from '../../redux/actions/user';

import { errorEmailHelper } from '../../utils/ErrorHandler' ;
import Validator from 'validator';

import swal from 'sweetalert';
import Loading from 'react-loading-components' ;

import UserImg from '../../assets/auth/user.png';

import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input' ;

import { 
    Grid,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    Dialog,
    DialogTitle,
    Divider,
    DialogContent,
    DialogActions
} from '@mui/material';

import {
    Button,
    TextField,
    UploadForm,
    UploadInput,
    PhoneNumberForm
} from '../../shared/ui' ;

import {
    useTheme
} from '@mui/styles' ;

const EditModal = (props) => {

    const {
        UpdateCollaborator,
        GetCollaborators,

        open,
        handleClose,

        data,
        updated_id
    } = props ;

    const theme = useTheme() ;
    const navigate = useNavigate() ;

    const [loading, setLoading] = React.useState(false) ;

    const [phoneNumber, setPhoneNumber] = React.useState(null) ;
    const [photoImg, setPhotoImg] = React.useState({
        preview : "",
        raw : ""
    }) ;
    const [docFile, setDocFile] = React.useState({
        name : "",
        raw : ""
    }) ;
    const [position, setPosition] = React.useState('admin') ;
    const [cav, setCAV] = React.useState(null) ;
    const [name, setName] = React.useState(null) ;
    const [houseHold, setHouseHold] = React.useState(null) ;
    const [informEmail, setInformEmail] = React.useState(null) ;
    const [password, setPassword] = React.useState(null) ;
    const handleChangePhoto = (e) => {
        setPhotoImg({
            preview: URL.createObjectURL(e.target.files[0]),
            raw : e.target.files[0]
        })
    }

    const handleChangeDoc = (e) => {
        setDocFile({
            name : e.target.files[0].name,
            raw : e.target.files[0]
        })
    }

    const handleChangePos = (e) => {
        setPosition(e.target.value) ;
    };

    const handleUpdate = async () => {
        setLoading(true) ;

        if(await UpdateCollaborator(updated_id, photoImg.raw, position, cav, name, phoneNumber, houseHold, informEmail)){
            GetCollaborators() ;

            swal({
                title : 'Success',
                text : 'Update Successfully',
                icon : 'success',
                buttons : false,
                timer : 5000
            })
        } else {
            swal({
                title : 'Failed',
                text : 'Update Failed',
                icon : 'error',
                buttons : false,
                timer : 5000
            }) ;
        }

        setLoading(false);

        handleClose() ;
    }

    React.useEffect(() => {
        setPhotoImg({
            preview : data?.profile_photo_url || "",
            raw : ""
        });

        setCAV(data?.cav || null);
        setName(data?.name || null);
        setPosition(data?.position || null);
        setPhoneNumber(data?.phone_number || null); 
        setHouseHold(data?.house_hold || null);
        setInformEmail(data?.inform_email || null);
    }, [data]) ;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Edit Employee</DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <UploadForm>
                            <UploadInput htmlFor="arial-photo">
                            {
                                photoImg.preview ? (
                                    <>
                                        <img src={photoImg.preview}/>
                                    </>
                                ) : (
                                    <>
                                        <img src={UserImg} crossOrigin='anonymous' />
                                    </> 
                                )
                            }
                            </UploadInput>
                            <input
                                type="file"
                                id="arial-photo"
                                name="arial-photo"
                                style={{ display: "none" }}
                                accept={'image/*'}
                                onChange={handleChangePhoto}
                            />
                        </UploadForm>
                    </Grid>
                    <Grid item xs={12}>
                        <RadioGroup
                            row
                            onChange={handleChangePos}
                            value={position}
                        >
                            <FormControlLabel value="admin" control={<Radio />} label="Administrator " />
                            <FormControlLabel value="backoffice" control={<Radio />} label="Back office" />
                            <FormControlLabel value="teamleader" control={<Radio />} label="Team leader" />
                            <FormControlLabel value="coordinator" control={<Radio />} label="Coordinator" />
                            <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size='small'
                            label='CAV'
                            value={cav || ''}
                            onChange={(e) => setCAV(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size='small'
                            label='Name'
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PhoneNumberForm
                            theme={theme}
                        >
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                            />
                            <Box sx={{color : 'red', fontSize : 13}}>
                                {
                                    phoneNumber ? (isValidPhoneNumber(phoneNumber) ? undefined : 'Invalid phone number') : ''
                                }
                            </Box>
                        </PhoneNumberForm>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size='small'
                            label='Household'
                            value={houseHold || ''}
                            onChange={(e) => setHouseHold(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size='small'
                            label='Inform Email'
                            value={informEmail || ''}
                            onChange={(e) => setInformEmail(e.target.value.toLowerCase())}
                            helperText={ errorEmailHelper(informEmail) }
                            
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                            size='small'
                            label='Password'
                            value={password || ''}
                            onChange={(e) => setPassword(e.target.value)}
                            helperText={ errorPasswordHelper(password) }
                        />
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <UploadForm>
                            <UploadInput htmlFor="arial-doc">
                            {
                                docFile.name || "Upload Csv, Docx, Pdf"
                            }
                            </UploadInput>
                            <input
                                type="file"
                                id="arial-doc"
                                name="arial-photo"
                                style={{ display: "none" }}
                                accept={'image/*'}
                                onChange={handleChangeDoc}
                            />
                        </UploadForm>
                    </Grid> */}
                </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button variant='contained'
                    onClick={handleUpdate}
                    disabled={
                        loading 
                        ||!position || !name || !isValidPhoneNumber(phoneNumber || '') 
                        || !houseHold || !Validator.isEmail(informEmail || '') 
                        || !cav
                    }
                >
                    {loading && <Loading type='oval' width={20} height={20} fill={'white'} />} &nbsp; Update
                </Button>
                <Button variant='contained' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
EditModal.propTypes = {
    UpdateCollaborator: PropTypes.func.isRequired,
    GetCollaborators : PropTypes.func.isRequired
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = {
    UpdateCollaborator,
    GetCollaborators
}
export default connect(mapStateToProps, mapDispatchToProps)(EditModal) ;