import * as React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { GetCollaborators } from '../../redux/actions/user';
import PublicList from '../../components/Pending/PublicList';

const Pending = (props) => {
    const {
        GetCollaborators,

        adminList,
        backOfficeList,
        teamleaderList,
        coordinatorList,
        managerList
    } = props ;

    const [allUsers, setAllUsers] = React.useState(null) ;

    React.useEffect(() => {
        GetCollaborators() ;
    }, []) ;

    React.useEffect(() => {
        if(adminList) setAllUsers([...adminList, ...backOfficeList, ...teamleaderList, ...coordinatorList, ...managerList]) ;
    }, [adminList]) ;

    return (
        <>
            <PublicList 
                dataList={allUsers}
            />
        </>
    )
}

Pending.propTypes = {
    GetCollaborators : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    adminList: state.user.adminList,
    backOfficeList : state.user.backOfficeList,
    teamleaderList : state.user.teamleaderList,
    coordinatorList : state.user.coordinatorList,
    managerList : state.user.managerList
})
const mapDispatchToProps = {
    GetCollaborators
}
export default connect(mapStateToProps, mapDispatchToProps)(Pending) ;