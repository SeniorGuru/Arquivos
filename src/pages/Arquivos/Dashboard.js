import * as React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GetCollaborators } from '../../redux/actions/user' ;

import { useTranslate } from '../../contexts/language';

import CollaboratorList from '../../components/Dashboard/CollaboratorList';

import { RootDiv } from './Styles/Dashboard.styles';

import {
    Card
} from '../../shared/ui' ;

const Dashboard = (props) => {
    
    const {
        GetCollaborators,

        adminList,
        backOfficeList,
        teamleaderList,
        coordinatorList,
        managerList
    } = props ;

    const {
        sysLang
    } = useTranslate() ;

    const [selectedList, setSelectedList] = React.useState(null) ;
    
    React.useEffect(() => {
        GetCollaborators() ;
    }, []) ;

    React.useEffect(() => {
        setSelectedList(adminList || null) ;
    }, [adminList]) ;

    return (
        <RootDiv>
            <Card
                color='primary'
                label={sysLang['admin']}
                cnt={adminList?.length}
                onClick={() => setSelectedList(adminList)}
            />

            <Card
                color='info'
                label={sysLang['backoffice']}
                cnt={backOfficeList?.length}
                onClick={() => setSelectedList(backOfficeList)}
            />

            <Card
                color='secondary'
                label={sysLang['teamleader']}
                cnt={teamleaderList?.length}
                onClick={() => setSelectedList(teamleaderList)}
            />

            <Card
                color='danger'
                label={sysLang['coordinator']}
                cnt={coordinatorList?.length}
                onClick={() => setSelectedList(coordinatorList)}
            />

            <Card
                color='success'
                label={sysLang['manager']}
                cnt={managerList?.length}
                onClick={() => setSelectedList(managerList)}
            />

            <CollaboratorList 
                dataList={selectedList}
            />
        </RootDiv>
    )
}
Dashboard.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard) ;