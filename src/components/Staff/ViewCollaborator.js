import * as React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GetEmployees } from '../../redux/actions/user';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { positions } from '../../static/constants';

import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, CircularProgress } from '@mui/material';

import DetailViewModal from './DetailViewModal';

const ViewCollaborator = (props) => {
    const {
        GetEmployees,

        employeesList
    } = props ;

    const headList = [
        "No",
        "Name",
        "Position",
        "Email",
        "View"
    ]

    const [filterList, setFilterList] = React.useState(null) ;

    const [openModal, setOpenModal] = React.useState(false) ;
    const [selected_data, setSelectedData] = React.useState(null) ;

    const handleOpenModal = (data) => {
        setSelectedData(data) ;

        setOpenModal(true) ;
    }
    const handleCloseModal = () => {
        setOpenModal(false) ;
    }

    React.useEffect(() => {
        if(employeesList) {
            setFilterList(employeesList) ;
        }
    }, [employeesList]) ;

    React.useEffect(() => {
        GetEmployees() ;
    }, []) ;

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headList.map((head, index) => (
                                <TableCell key={index}>
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            filterList ? filterList.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{row.data().name}</TableCell>
                                    <TableCell>{positions[row.data().position]}</TableCell>
                                    <TableCell>{row.data().inform_email}</TableCell>
                                    <TableCell sx={{cursor : 'pointer'}}
                                        onClick={() => handleOpenModal(row.data())}
                                    ><RemoveRedEyeIcon/></TableCell>
                                </TableRow>
                            )) : <TableRow>
                                <TableCell colSpan={5} sx={{textAlign: 'center'}}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <DetailViewModal 
                open={openModal}
                handleClose={handleCloseModal}
                data={selected_data}
            />
        </>
    )
}
ViewCollaborator.propTypes = {
    GetEmployees : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    employeesList : state.user.employeesList

})
const mapDispatchToProps = {
    GetEmployees
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCollaborator) ;