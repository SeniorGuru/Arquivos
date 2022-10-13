import htmlStyled from 'styled-components' ;

export const RootDiv = htmlStyled.div`
    border : 1px solid black;
    border-radius : 5px;

    padding : 20px;
    margin : 20px;

    max-width : 500px;
`

export const TitleDiv = htmlStyled.div`
    font-size : 30px;
    font-weight : 800;

    margin-bottom : 10px;

    text-align : center;
`

export const LinkDiv = htmlStyled.span`
    margin-left : 15px;
    cursor : pointer;    
    text-decoration : underline;

    &:hover {
        color : red;
    }
`