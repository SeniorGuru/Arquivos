import * as React from 'react' ;

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { SignInUser } from '../../redux/actions/auth';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import swal from 'sweetalert';

import { 
    Grid,
} from '@mui/material';

import { 
    Button,
    TextField
} from '../../shared/ui';

import { 
    RootDiv,
    TitleDiv,
    LinkDiv
} from './Styles/Common.styles';

const SignIn = (props) => {
    const {
        SignInUser,

        handleChangeStep
    } = props ;

    const [email, setEmail] = React.useState(null) ;
    const [password, setPassword] = React.useState(null) ;
    const [visiblePwd, setVisiblePwd] = React.useState(false) ;

    const handleSignIn = async () => {
        let res = await SignInUser(email, password) ;

        if( res === 200) {
            if(
                await swal({
                    title: "Let's go!",
                    buttons: {
                        confirm : {text:'Got it'},
                    },
                    icon : 'success'
                })
            ) {
                // navigate('/solstice/setting-screen') ;
            }
        } 

        if(res === 201) {
            swal({
                title: 'Your Email is not verified',
                text: `${"Please check your mailbox for a confirmation email \r\n if you don’t receive email within 2min please check your spam folder"}`,
                buttons: {
                    confirm : { text:'Got it' },
                },
                icon : 'info'
            })
        }

        if( res === 'too-many-requests' ) {
            swal({
                title: 'Too Many Requests',
                text: 'Too many sign in requests with this email\nPlease, try it after about 30s',
                buttons: {
                    confirm : {text:'Got it'},
                },
                icon : 'error'
            })
        }
        if( res === 'wrong-password' ){
            swal({
                title: 'Wrong Password',
                text: 'You are using wrong password',
                buttons: {
                    confirm : {text:'Got it'},
                },
                icon : 'error'
            })
        }
        if( res === 'user-not-found' ){
            swal({
                title: 'User Not Found',
                text: 'This account is not exist',
                buttons: {
                    confirm : {text:'Got it'},
                },
                icon : 'error'
            })
        }
    }

    return (
        <RootDiv>
            <TitleDiv>Sign In</TitleDiv>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        size='small'
                        label='Email'
                        placeholder='your@email.com'
                        value={email || ''}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        size='small'
                        label='Password'
                        placeholder='Password'
                        value={password || ''}
                        onChange={(e) => setPassword(e.target.value)}
                        type={visiblePwd ? 'text' : 'password'}
                        InputProps={{
                            endAdornment : <div onClick={() => setVisiblePwd(!visiblePwd)}>
                                { visiblePwd ? <VisibilityIcon /> : <VisibilityOffIcon/> }
                            </div>
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleSignIn} 
                        variant={'contained'}
                    >
                        Sign In
                    </Button>
                    <LinkDiv onClick={() => handleChangeStep('signup')}>
                        Sign Up
                    </LinkDiv>
                </Grid>
            </Grid>
        </RootDiv>
    )
}
SignIn.propTypes = {
    SignInUser : PropTypes.func.isRequired
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = ({
    SignInUser
})
export default connect(mapStateToProps, mapDispatchToProps)(SignIn) ;