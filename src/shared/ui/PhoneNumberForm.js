import styled from 'styled-components' ;

export default styled.div`
    & input {
        &:focus {
            border: 1px solid ${props => props.theme.palette.green.G400} !important ;
        }

        &:hover {
            border: 1px solid ${props => props.theme.palette.green.G400} !important ;
        }

        outline : none !important ;

        padding : 10px !important ;
        padding-left : 10px !important ;

        display : flex !important ; 
        align-items : center !important ;
        border: 1px solid ${props => props.theme.palette.green.G400} !important ;
        border-radius : 5px ;
    }
`