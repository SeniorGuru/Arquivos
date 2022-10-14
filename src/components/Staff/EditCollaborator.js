import * as React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GetCollaborators } from '../../redux/actions/user';

import EditIcon from '@mui/icons-material/Edit';

import { positions } from '../../static/constants';
import { getCookie } from '../../utils/Helper';

import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, CircularProgress } from '@mui/material';

import EditModal from '../Modal/EditModal';

const EditCollaborator = (props) => {
    const {
        GetCollaborators,

        adminList
    } = props ;

    const headList = [
        "No",
        "Name",
        "Position",
        "Email",
        "Edit"
    ]

    const [filterList, setFilterList] = React.useState(null) ;

    const [openModal, setOpenModal] = React.useState(false) ;
    const [selected_data, setSelectedData] = React.useState(null) ;
    const [selected_id, setSelectedId] = React.useState(null) ;

    const handleOpenModal = (data, id) => {
        setSelectedData(data) ;
        setSelectedId(id) ;

        setOpenModal(true) ;
    }
    const handleCloseModal = () => {
        setOpenModal(false) ;
    }

    React.useEffect(() => {
        if(adminList) {
            setFilterList(adminList.filter(row => row.id !== getCookie('user_id'))) ;
        }
    }, [adminList]) ;

    React.useEffect(() => {
        GetCollaborators() ;
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
                                        onClick={() => handleOpenModal(row.data(), row.id)}
                                    ><EditIcon/></TableCell>
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

            <EditModal 
                open={openModal}
                handleClose={handleCloseModal}
                data={selected_data}
                updated_id={selected_id}
            />
        </>
    )
}
EditCollaborator.propTypes = {
    GetCollaborators : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    adminList : state.user.adminList

})
const mapDispatchToProps = {
    GetCollaborators
}
export default connect(mapStateToProps, mapDispatchToProps)(EditCollaborator) ;