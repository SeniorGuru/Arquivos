import * as React from 'react' ;

import { useTranslate } from '../../contexts/language';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GetEmployees } from '../../redux/actions/user';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { positions } from '../../static/constants';
import { getCookie } from '../../utils/Helper';

import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, CircularProgress } from '@mui/material';

import DetailViewModal from '../Modal/DetailViewModal';

const ViewCollaborator = (props) => {
    const {
        GetEmployees,

        employeesList
    } = props ;

    const {
        sysLang
    } = useTranslate() ;

    const headList = [
        "no",
        "name",
        "position",
        "informemail",
        "view"
    ]

    const [filterList, setFilterList] = React.useState(null) ;

    const [openModal, setOpenModal] = React.useState(false) ;
    const [selected_data, setSelectedData] = React.useState(null) ;
    const [selected_id, setSelectedId] = React.useState(null);

    const handleOpenModal = (data,id) => {
        setSelectedData(data) ;
        setSelectedId(id) ;

        setOpenModal(true) ;
    }
    const handleCloseModal = () => {
        setOpenModal(false) ;
    }

    React.useEffect(() => {
        if(employeesList) {
            setFilterList(employeesList.filter(row => row.id !== getCookie('user_id'))) ;
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
                                    {sysLang[head]}
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
                                        onClick={() => handleOpenModal(row.data(), row.id)}
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
                id={selected_id}
                hiddenForm={false}
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