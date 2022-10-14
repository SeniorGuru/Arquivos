import * as React from 'react' ;

import styled from 'styled-components';

import { 
    TableCell, TableContainer, TableRow,
    Table,TableHead,TableBody, CircularProgress
} from '@mui/material';

import { getCookie } from '../../utils/Helper';

const CollaboratorList = (props) => {
    const headList = [
        "No",
        "Avatar",
        "Name",
        "Position",
        "Phone Number",
        "Inform Email",
        "CAV"
    ] ;

    const {
        dataList
    } = props;

    const [filterList, setFilterList] = React.useState(null) ;

    React.useEffect(() => {
        if(dataList) {
            setFilterList(dataList.filter(row => row.id !== getCookie('user_id')))
        }
    }, [dataList]) ;

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {headList.map((head, index)=> (
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
    )
}

export default CollaboratorList ;

const Avatar = styled.img`
    width : 50px;
    height : 50px;
    border-radius : 50%;
`