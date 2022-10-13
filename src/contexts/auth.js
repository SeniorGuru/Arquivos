import * as React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserProfile } from '../redux/actions/auth';

const AuthContext = React.createContext({}) ;

const AuthProvider = (props) => {
    const {
        profile,

        UserProfile
    } = props ;

    React.useEffect(() => {
        UserProfile() ;
    }, []) ;

    return (
        <AuthContext.Provider
            value={{profile}}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
AuthProvider.propTypes  = {
    UserProfile : PropTypes.func.isRequired
}
const mapStatToProps = state => ({
    profile : state.auth.profile
})
const mapDispatchToProps = {
    UserProfile
}

export default connect(mapStatToProps, mapDispatchToProps)(AuthProvider) ;

export const useAuth = () => (
    React.useContext(AuthContext)
)