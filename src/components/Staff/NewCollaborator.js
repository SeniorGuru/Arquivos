import * as React from 'react' ;

import { useNavigate } from 'react-router-dom';
import { useTranslate } from '../../contexts/language';

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { AddCollaborator } from '../../redux/actions/auth';

import { errorEmailHelper, errorPasswordHelper } from '../../utils/ErrorHandler' ;
import Validator from 'validator' ;

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

const NewCollaborator = (props) => {

    const {
        AddCollaborator,
    } = props ;

    const theme = useTheme() ;
    const navigate = useNavigate() ;

    const {
        sysLang
    } = useTranslate() ;

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

    const handleAddCollaborator = async () => {
        if(AddCollaborator(photoImg.raw, position, cav, name, phoneNumber, houseHold, informEmail, password, docFile.raw)){
            navigate('/arquivos/staff') ;

            return swal({
                title : 'Success',
                text : 'Add Collaborator Successfully\r\nPlease, check your email box and verify your email.',
                icon : 'success',
                buttons : false,
                timer : 5000
            })
        } ;

        swal({
            title : 'Failed',
            text : 'Add Collaborator Failed',
            icon : 'error',
            buttons : false,
            timer : 5000
        })
    }

    return (
        <RootDiv>
            <TitleDiv>{`${sysLang['register']} ${sysLang['collaborator']}`}</TitleDiv>
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
                        value={position}
                    >
                        <FormControlLabel value="admin" control={<Radio />} label={sysLang['admin']} />
                        <FormControlLabel value="backoffice" control={<Radio />} label={sysLang['backoffice']} />
                        <FormControlLabel value="teamleader" control={<Radio />} label={sysLang['teamleader']} />
                        <FormControlLabel value="coordinator" control={<Radio />} label={sysLang['coordinator']} />
                        <FormControlLabel value="manager" control={<Radio />} label={sysLang['manager']} />
                    </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        size='small'
                        label={sysLang['cav']}
                        value={cav || ''}
                        onChange={(e) => setCAV(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        size='small'
                        label={sysLang['name']}
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
                        label={sysLang['household']}
                        value={houseHold || ''}
                        onChange={(e) => setHouseHold(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        size='small'
                        label={sysLang['informemail']}
                        value={informEmail || ''}
                        onChange={(e) => setInformEmail(e.target.value.toLowerCase())}
                        helperText={ errorEmailHelper(informEmail) }
                        
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        size='small'
                        label={sysLang['password']}
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
                        onClick={handleAddCollaborator}
                        disabled={
                            !position || !name || !isValidPhoneNumber(phoneNumber || '') 
                            || !houseHold || !Validator.isEmail(informEmail || '') 
                            || password?.length < 8 || !password
                            || !photoImg.raw || !docFile.raw
                            || !cav
                        }
                    >
                        {sysLang['register']}
                    </Button>
                </Grid>
            </Grid>
        </RootDiv>
    )
}
NewCollaborator.propTypes = {
    AddCollaborator : PropTypes.func.isRequired
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = {
    AddCollaborator
}
export default connect(mapStateToProps, mapDispatchToProps)(NewCollaborator) ;