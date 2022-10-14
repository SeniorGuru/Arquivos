import * as React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GenerateReport, GetReports } from '../../redux/actions/report';

import Loading from 'react-loading-components' ;

import { Dialog, DialogContent, Divider, DialogTitle, Grid, MenuItem, Select, DialogActions, FormControl,
    InputLabel
} from '@mui/material';

import {
    TextField, Button
} from '../../shared/ui' ;

const AddReportModal = (props) => {
    const {
        open,
        handleClose,

        GenerateReport,
        GetReports
    } = props ;

    const [loading, setLoading] = React.useState(false);

    const [objective, setObjective] = React.useState(null) ;
    const [sales, setSales] = React.useState(null) ;
    const [ranking, setRanking] = React.useState(null) ;
    const [pending, setPending] = React.useState(null) ;
    const [ls, setLs] = React.useState('1') ;
    const [packet_type, setPacketType] = React.useState('3P') ;
    const [team, setTeam] = React.useState(null) ;
    const [vpp, setVpp] = React.useState(null) ;
    const [nos_cnt_year, setNosCntYear] = React.useState(0) ;
    const [nos_cnt_date, setNosCntDay] = React.useState(0) ;
    const [type_pending, setTypePending] = React.useState(null) ;

    const handleGenerateReport = async () => {
        setLoading(true) ;

        await GenerateReport(
            team,
            vpp,
            objective,
            sales,
            ranking,
            pending,
            nos_cnt_year,
            nos_cnt_date,
            type_pending,
            ls,
            packet_type
        );

        setLoading(false) ;

        GetReports() ;
        handleClose() ;
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Generate Report</DialogTitle>
            <Divider/>
            <DialogContent >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                            label={'Team'}
                            size='small'
                            value={team || ''}
                            onChange={(e)=>setTeam(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label={'VPP'}
                            size='small'
                            value={vpp || ''}
                            onChange={(e)=>setVpp(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label={'Objective'}
                            size='small'
                            value={objective || ''}
                            onChange={(e)=>setObjective(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label={'Sales'}
                            size='small'
                            value={sales || ''}
                            onChange={(e)=>setSales(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label={'Ranking'}
                            size='small'
                            value={ranking || ''}
                            onChange={(e)=>setRanking(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label={'Pending'}
                            size='small'
                            value={pending || ''}
                            onChange={(e)=>setPending(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label={'No. of Total NOS pending(Year)'}
                            size='small'
                            type='number'
                            inputProps={{ min: 0 }}
                            value={nos_cnt_year}
                            onChange={(e)=>setNosCntYear(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label={'No. of Total NOS pending(Day)'}
                            size='small'
                            value={nos_cnt_date}
                            type='number'
                            inputProps={{ min: 0 }}
                            onChange={(e)=>setNosCntDay(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label={'Type Pending'}
                            size='small'
                            value={type_pending || ''}
                            onChange={(e)=>setTypePending(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{minWidth : '100px'}}>
                            <InputLabel id="ls-select-label">LS</InputLabel>
                            <Select 
                                labelId="ls-select-label"
                                size='small'
                                value={ls}
                                onChange={(e)=>setLs(e.target.value)}
                                label="LS"
                            >
                                <MenuItem value='1'>1</MenuItem>
                                <MenuItem value='2'>2</MenuItem>
                                <MenuItem value='3'>3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{minWidth : '100px'}}>
                            <InputLabel id="packet-type-select-label">Packet Type</InputLabel>
                            <Select 
                                labelId="packet-type-select-label"
                                label='Packet Type'
                                size='small'
                                value={packet_type}
                                onChange={(e)=>setPacketType(e.target.value)}
                            >
                                <MenuItem value='3P'>3P</MenuItem>
                                <MenuItem value='4P'>4P</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Button variant='contained'
                    onClick={handleGenerateReport}
                    disabled={
                        loading
                    }
                >
                    {loading && <Loading type='oval' width={20} height={20} fill={'white'} />} &nbsp; Generate
                </Button>
                <Button variant='contained'
                    onClick={handleClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
AddReportModal.propTypes = {
    GenerateReport : PropTypes.func.isRequired,
    GetReports : PropTypes.func.isRequired
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = {
    GenerateReport,
    GetReports
}
export default connect(mapStateToProps, mapDispatchToProps)(AddReportModal) ;