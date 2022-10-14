import styled from 'styled-components' ;

export const MenubarMain = styled.div`
    background : ${props => props.theme.palette.primary.main};
    height : 50px;

    display : flex;
    justify-content : flex-end;
    align-items : center;
    gap : 20px;

    padding-right : 10px;
`

export const TranlationGroup = styled.div`
    display : flex;
    align-items : center;

    & svg  {
        color : white;
        font-size : 18px;
    }
`