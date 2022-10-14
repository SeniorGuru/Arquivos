import * as React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GetReports } from '../../redux/actions/report';

import AddReportModal from '../../components/Report/AddReportModal';
import ReportsList from '../../components/Report/ReportsList';

import {
    Button
} from '../../shared/ui' ;

import { GenerateDiv } from './Styles/Report.styles';

const Report = (props) => {
    const {
        reportList,

        GetReports
    } = props ;

    const [open, setOpen] = React.useState(false) ;

    const handleOpen = () => {
        setOpen(true) ;
    }
    const handleClose = () => {
        setOpen(false) ;
    }

    React.useEffect(() => {
        GetReports();
    }, []) ;

    return (
        <>
            <GenerateDiv>
                <Button variant='outlined' onClick={handleOpen}>Generate New Report</Button>
            </GenerateDiv>
            <ReportsList 
                dataList={reportList}
            />
            <AddReportModal 
                open={open}
                handleClose={handleClose}
            />
        </>
    )
}
Report.propTypes = {
    GetReports : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    reportList : state.report.reportList
})
const mapDispatchToProps = {
    GetReports
}
export default connect(mapStateToProps, mapDispatchToProps)(Report) ;