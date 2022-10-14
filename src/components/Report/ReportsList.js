import * as React from 'react' ;

import { useDownloadExcel } from 'react-export-table-to-excel';

import styled from 'styled-components';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import { Button } from '../../shared/ui';

const ReportsList = (props) => {
    const {
        dataList
    } = props ;

    const headList = [
        "No",
        "Team",
        "VPP",
        "Objective",
        "Sales",
        "Ranking",
        "Pending",
        "No. of Total NOS pending(Year)",
        "No. of Total NOS pending(Day)",
        "Type Pending",
        "LS",
        "Packet Type",
        "Generated",
    ] ;

    const [filterList, setFilterList] = React.useState(null) ;

    const tableRef = React.useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: `${new Date().toDateString()}-Reports Data`,
        sheet: `${new Date().toDateString()}-Reports Data`
    }) ;

    React.useEffect(()=>{
        if(dataList) setFilterList(dataList);
    }, [dataList]) ;

    return (
        <TableContainer>
            <Table ref={tableRef}>
                <TableHead>
                    <TableRow>
                        {
                            headList.map((head, index) => (
                                <TableCell key={index}>{head}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        filterList ? filterList.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{row.data().team}</TableCell>
                                <TableCell>{row.data().vpp}</TableCell>
                                <TableCell>{row.data().objective}</TableCell>
                                <TableCell>{row.data().sales}</TableCell>
                                <TableCell>{row.data().ranking}</TableCell>
                                <TableCell>{row.data().pending}</TableCell>
                                <TableCell>{row.data().nos_cnt_year}</TableCell>
                                <TableCell>{row.data().nos_cnt_date}</TableCell>
                                <TableCell>{row.data().type_pending}</TableCell>
                                <TableCell>{row.data().ls}</TableCell>
                                <TableCell>{row.data().packet_type}</TableCell>
                                <TableCell>{row.data().created_at.toDate().toString()}</TableCell>
                            </TableRow>
                        )) : <></>
                    }
                </TableBody>
            </Table>
            <DownloadDiv>
                <Button onClick={onDownload} variant={'contained'}
                    disabled={!filterList?.length}
                >Save as Excel</Button>
            </DownloadDiv>
        </TableContainer>
    )
}
export default ReportsList ;

const DownloadDiv = styled.div`
    margin-top : 15px;
    display : flex;
    justify-content : flex-end;
`