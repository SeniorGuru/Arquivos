import styled from 'styled-components' ;

export const NavbarMain = styled.div`
    min-height : 100vh;
    min-width : 250px;

    border-right : 2px solid gray;
`
export const LogoDiv = styled.div`
    color : white;
    background : ${props => props.theme.palette.primary.main};
    font-size: 20px;
    text-align: center;
    font-family: 'Kaushan Script', cursive;
    font-weight: 500;
    height: 50px;
    line-height : 50px;
    box-sizing : border-box;
    display: block;
`

export const ProfileDiv = styled.div`
    padding : 10px;
    padding-top : 20px;

    display : flex;
    align-items : center;

    gap : 20px;
`

export const Avatar = styled.img`
    border-radius : 50%;
    width : 45px;
    height : 45px;

    box-shadow : 0px 0px 10px 1px gray;
`

export const InfoDiv = styled.div`
    display : flex;
    flex-direction : column ;
    justify-content : center;
`

export const NameDiv = styled.div`
    font-size : 14px;
    font-weight : bold;
`

export const PositionDiv = styled.div`
    font-size : 11px;
`

export const NavItem = styled.div`
    display : flex;
    gap : 10px;
    width : 100%;

    cursor : pointer;
`