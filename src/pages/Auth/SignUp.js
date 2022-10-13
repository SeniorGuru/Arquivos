import * as React from 'react' ;

import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { SignUpUser } from '../../redux/actions/auth';

import { errorEmailHelper, errorPasswordHelper } from '../../utils/ErrorHandler' ;

import swal from 'sweetalert';

import UserImg from '../../assets/auth/user.png';

import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input' ;

import { 
    Grid,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel
} from '@mui/material';

import {
    LinkDiv,
    RootDiv, 
    TitleDiv
} from './Styles/Common.styles' ;

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

const SignUp = (props) => {

    const {
        SignUpUser,

        handleChangeStep
    } = props ;

    const theme = useTheme() ;

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

    const handleSignUp = async () => {
        if(SignUpUser(photoImg, position, cav, name, phoneNumber, houseHold, informEmail, password, docFile)){
            return swal({
                title : 'Success',
                text : 'Sign Up Successfully\r\nPlease, check your email box and verify your email.',
                icon : 'success',
                buttons : false,
                timer : 5000
            })
        } ;

        swal({
            title : 'Failed',
            text : 'Sign Up Failed',
            icon : 'error',
            buttons : false,
            timer : 5000
        })
    }

    return (
        <RootDiv>
            <TitleDiv>Sign Up</TitleDiv>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <UploadForm>
                        <UploadInput htmlFor="arial-photo">
                        {
                            photoImg.preview ? (
                                <>
                                    <img src={photoImg.preview} crossOrigin='anonymous' />
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
                <Grid item xs={12}>
                    <TextField
                        size='small'
                        label='Password'
                        value={password || ''}
                        onChange={(e) => setPassword(e.target.value)}
                        helperText={ errorPasswordHelper(password) }
                    />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained'
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Button>
                    <LinkDiv onClick={() => handleChangeStep('signin')}>
                        Already have and account?
                    </LinkDiv>
                </Grid>
            </Grid>
        </RootDiv>
    )
}
SignUp.propTypes = {
    SignUpUser : PropTypes.func.isRequired
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = {
    SignUpUser
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp) ;