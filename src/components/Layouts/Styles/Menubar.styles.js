import styled from 'styled-components' ;

export const MenubarMain = styled.div`
    background : ${props => props.theme.palette.primary.main};
    height : 50px;

    display : flex;
    justify-content : flex-end;
    align-items : center;

    padding-right : 10px;
`