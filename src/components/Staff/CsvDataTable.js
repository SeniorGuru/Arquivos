import * as React from 'react' ;

import { TableBody, TableContainer, TableRow, TableCell, Table } from '@mui/material';

import Loading from 'react-loading-components' ;

const CsvDataTable = (props) => {
    const {
        csvData
    } = props ;

    const [filterList, setFilterList] = React.useState(null) ;

    React.useEffect(() => {
        if(csvData) setFilterList(csvData) ;
    }, [csvData]) ;

    return (
        <>
            <TableContainer>
                <Table>
                    <TableBody>
                        {
                            filterList ? filterList.map((row, index) => (
                                <TableRow key={index}>
                                    {
                                        row.map((cell, index) => (
                                            <TableCell key={index} sx={{textAlign :'center'}}>
                                                {cell}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            )) : <TableRow>
                                <TableCell >
                                    <Loading type='oval' width={20} height={20} color={'white'} />
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default CsvDataTable ;