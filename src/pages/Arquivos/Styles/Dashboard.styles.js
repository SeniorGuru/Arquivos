import styled from 'styled-components' ;

export const Avatar = styled.img`
    border-radius : 50%;
    box-shadow : 0px 0px 15px 1px gray;
    border : 1px solid lightgray ;

    width : 150px;
    height : 150px;
`
export const MainInform = styled.div`
    display : flex;
    flex-direction : column ;
    gap : 10px;
    align-items : center;
`

export const NameDiv = styled.div`
    font-size : 23px;
    font-weight : bold;
`
export const PositionDiv = styled.div`

`

export const InformDiv = styled.div`
    margin-bottom : 40px;
`

export const LabelDiv = styled.div`
    font-size : 16px;
    font-weight : bold;
`

export const ValueDiv = styled.div`
    font-size : 18px;
    color : gray;
`