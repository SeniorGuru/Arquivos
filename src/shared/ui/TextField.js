import { withStyles } from '@mui/styles' ;

import {
    TextField
} from '@mui/material' ;

export default withStyles((theme) => ({
    root : {
        '& svg' : {
            cursor : 'pointer'
        },

        "& .MuiInputAdornment-root" : {
            "& p" :{
                color : 'white !important'
            }
        },
        
        "& .MuiInputLabel-root" : {
            color : "black !important",
        },
        "& .MuiFormControl-root" : {
            borderRadius : 5,
            "& svg" :{
                color : 'white'
            }
        },
        "& .MuiInputBase-input" :{
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.green.G400 + ' !important',
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.green.G400 + ' !important',
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.green.G400 + ' !important'
                },
            },
        },
        
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: 'red',
        },
        "& .MuiFormHelperText-root" : {
            fontSize: 15,
            color : '#ff2929 !important',
    
            marginTop : '10px !important'
        },
    }
}))(TextField);