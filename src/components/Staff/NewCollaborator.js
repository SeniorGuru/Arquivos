import * as React from 'react' ;

import { useNavigate } from 'react-router-dom';
import { useTranslate } from '../../contexts/language';

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { AddCollaborator } from '../../redux/actions/user';

import { errorEmailHelper, errorPasswordHelper } from '../../utils/ErrorHandler' ;
import Validator from 'validator' ;

import swal from 'sweetalert';
import { getExtension } from '../../utils/Helper';
import { storage  } from '../../firebase/config' ;
import { uploadBytesResumable ,ref , getDownloadURL} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid' ;

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
    PdfPreview,
    DocPreview,
    DocxPreview
} from '../../shared/components' ;

import {
    useTheme
} from '@mui/styles' ;
import CsvDataTable from './CsvDataTable';

const NewCollaborator = (props) => {

    const {
        AddCollaborator,
    } = props ;

    const theme = useTheme() ;
    const navigate = useNavigate() ;

    const {
        sysLang
    } = useTranslate() ;

    const reader = new FileReader();
    const [csvData, setCsvData] = React.useState([]) ;
    const [phoneNumber, setPhoneNumber] = React.useState(null) ;
    const [photoImg, setPhotoImg] = React.useState({
        preview : "",
        raw : "",
        name : ""
    }) ;
    const [docFile, setDocFile] = React.useState({
        name : "",
        raw : "",
        preview : ""
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
            raw : e.target.files[0],
            name : e.target.files[0].name
        })
    }

    const handleChangeDoc = async (e) => {
        if(!e.target.files.length) return ;

        let preview ;

        if(getExtension(e.target.files[0].name) === 'doc') {
            let storageRef = ref(storage, '_doc_temp/' + uuidv4()) ;

            let uploadTask = await uploadBytesResumable(storageRef, e.target.files[0]) ;
    
            preview = await getDownloadURL(uploadTask.ref) ;
        } else if(getExtension(e.target.files[0].name) === 'csv') {
            reader.onload = (e) => {
                let data = e.target.result;
    
                const tempList = [] ;
    
                data = data.split("\r\n"); 
    
                for (let row of data) { 
                    tempList.push(row.split(',')) ;
                }
    
                setCsvData([...tempList]) ;
                console.log(tempList) ;
            };
            reader.readAsText(e.target.files[0]);
        } else preview = URL.createObjectURL(e.target.files[0]) ;
        
        setDocFile({
            name : e.target.files[0].name,
            raw : e.target.files[0],
            preview
        })
    }

    const handleChangePos = (e) => {
        setPosition(e.target.value) ;
    };

    const handleAddCollaborator = async () => {
        if(AddCollaborator(photoImg.raw, photoImg.name, position, cav, name, phoneNumber, houseHold, informEmail, password, docFile.raw, docFile.name)){
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
                            <u>Upload PDF, DOCX, CSV</u>
                        }
                        </UploadInput>
                        {
                            getExtension(docFile.name) === 'pdf' && <PdfPreview 
                                previewUrl={docFile.preview}
                                width={300}
                                height={300}
                            />
                        }
                        {
                            getExtension(docFile.name) === 'doc' && <DocPreview
                                previewUrl={docFile.preview}
                                width={400}
                                height={400}
                            />
                        }
                        {
                            getExtension(docFile.name) === 'docx' && <DocxPreview
                                previewUrl={docFile.preview}
                                width={400}
                                height={400}
                                key={uuidv4()}
                            />
                        }
                        {
                            getExtension(docFile.name) === 'csv' && <CsvDataTable csvData={csvData} />
                        }
                        <input
                            type="file"
                            id="arial-doc"
                            name="arial-photo"
                            style={{ display: "none" }}
                            accept={'*'}
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