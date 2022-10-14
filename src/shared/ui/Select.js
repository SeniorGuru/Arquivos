import { Select } from "@mui/material";

import { makeStyles } from "@mui/styles";

  
const useStyles = makeStyles((theme) => ({
    root : {
        width : 'fit-content',
        
        "& .MuiFormControl-root" : {
            borderRadius : 5,
            padding : '0px !important',
        },

        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: 'none !important',
            },
            '&:hover fieldset': {
                border: 'none !important',
            },
            '&.Mui-focused fieldset': {
                border: 'none !important',
            },
            "& svg" : {
                color : 'white !important'
            }
        },
        "& .MuiInputBase-input" :{
            color : 'white !important',
        },
    },

    selectStyle : {
        "& .MuiPaper-root" : {
            "&::-webkit-scrollbar-track" : {
                marginTop : '5px',
                marginBottom : '5px'
            },
        },
        "& .MuiList-root" : {
            padding : '0px !important',
        },
        "& .MuiMenuItem-root" : {
            borderBottom : '1px solid lightgray !important',
            "&:last-child" : {
                borderBottom : 'none !important',
            },
            fontSize : 15,
        },
    }
})) ;

export default (props) => {
    const classes = useStyles() ;

    return (
        <div className={classes.root}>
            <Select {...props} MenuProps={{ className: classes.selectStyle }} />
        </div>
    )
}
