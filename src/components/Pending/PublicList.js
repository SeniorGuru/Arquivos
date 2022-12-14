import * as React from 'react' ;

import { useAuth } from '../../contexts/auth' ;
import { useTranslate } from '../../contexts/language';

import { getCookie } from '../../utils/Helper';

import styled from 'styled-components';

import { 
    TableCell, TableContainer, TableRow, Button,
    Table,TableHead,TableBody, CircularProgress, ButtonGroup
} from '@mui/material';

import DetailViewModal from '../Modal/DetailViewModal';
import EditModal from '../Modal/EditModal';

const PublicList = (props) => {
    const headList = [
        "no",
        "avatar",
        "name",
        "position",
        "phonenumber",
        "informemail",
        "cav",
        "edit-view"
    ] ;

    const {
        dataList
    } = props;

    const {
        profile
    } = useAuth() ;

    const {
        sysLang
    } = useTranslate() ;

    const [filterList, setFilterList] = React.useState(null) ;

    const [openViewModal, setOpenViewModal] = React.useState(false) ;
    const [openEditModal, setOpenEditModal] = React.useState(false) ;
    const [selected_data, setSelectedData] = React.useState(null) ;
    const [selected_id, setSelectedId] = React.useState(null) ;

    const handleOpenViewModal = (data, id) => {
        setSelectedData(data) ;
        setSelectedId(id) ;

        setOpenViewModal(true) ;
    }
    const handleCloseViewModal = () => {
        setOpenViewModal(false) ;
    }

    const handleOpenEditModal = (data, id) => {
        setSelectedData(data) ;
        setSelectedId(id) ;

        setOpenEditModal(true) ;
    }
    const handleCloseEditModal = () => {
        setOpenEditModal(false) ;
    }

    React.useEffect(() => {
        if(dataList) {
            setFilterList(dataList.filter(row => row.id !== getCookie('user_id'))) ;
        }
    }, [dataList]) ;

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headList.map((head, index)=> (
                                <TableCell key={index}>
                                    { head === 'edit-view' ? `${sysLang['edit']}/${sysLang['view']}` : sysLang[head]}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            filterList ? filterList.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {index+1}
                                    </TableCell>
                                    <TableCell>
                                        <Avatar src={row.data().profile_photo_url} />
                                    </TableCell>
                                    <TableCell>{row.data().name}</TableCell>
                                    <TableCell>{row.data().position}</TableCell>
                                    <TableCell>{row.data().phone_number}</TableCell>
                                    <TableCell>{row.data().inform_email}</TableCell>
                                    <TableCell>{row.data().cav}</TableCell>
                                    <TableCell>
                                        <ButtonGroup>
                                            <Button variant='contained' size='small'
                                                disabled={profile?.position !== 'admin'}
                                                onClick={() => handleOpenEditModal(row.data(), row.id)}
                                                sx={{textTransform : 'capitalize'}}
                                            >
                                                {sysLang['edit']}
                                            </Button>
                                            <Button variant='contained' size='small' color='success'
                                                onClick={() => handleOpenViewModal(row.data())}
                                                sx={{textTransform : 'capitalize'}}
                                            >
                                                {sysLang['view']}
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            )) : <TableRow>
                                <TableCell colSpan={headList.length} sx={{textAlign : 'center'}}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <DetailViewModal 
                open={openViewModal}
                handleClose={handleCloseViewModal}
                data={selected_data}
                id={selected_id}
                hiddenForm={true}
            />

            <EditModal 
                open={openEditModal}
                handleClose={handleCloseEditModal}
                data={selected_data}
                updated_id={selected_id}
            />
        </>
    )
}

export default PublicList ;

const Avatar = styled.img`
    width : 50px;
    height : 50px;
    border-radius : 50%;

    box-shadow : 0px 0px 6px 0px gray;
`