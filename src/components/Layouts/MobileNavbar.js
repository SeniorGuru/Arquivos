import * as React from 'react' ;

import { Drawer } from '@mui/material';

import Navbar from './Navbar';

import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    drawer: {
        zIndex : 10000,
        "& .MuiBackdrop-root": {
            display: "none"
        },
    },
    drawerPaper: {
        width : "100%",
        '& ::-webkit-scrollbar': {
            display: 'none !important',
        },
    }
})) ;

const MobileNavbar = (props) => {
    const {
        open,
        handleClose,
    } = props ;

    const classes = useStyles() ;

    return (
        <Drawer
            variant='persistent'
            anchor='right'
            open={open}
            onClose={handleClose}
            className={classes.drawer}
            classes={{
                paper : classes.drawerPaper
            }}
        >
            <Navbar 
                handleClose={handleClose}
            />
        </Drawer>
    )
}

export default MobileNavbar ;