import * as React from 'react' ;

import SignIn from './SignIn' ;
import SignUp from './SignUp' ;

import { 
    RootDiv 
} from './Styles/index.styles';

const Auth  = ()  => {
    
    const [authStep, setAuthStep] = React.useState('signin') ;

    return (
        <RootDiv>
            { authStep === 'signin' && <SignIn
                handleChangeStep={setAuthStep}
            /> }

            { authStep === 'signup' && <SignUp
                handleChangeStep={setAuthStep}
            /> }
        </RootDiv>
    )
}

export default Auth ;