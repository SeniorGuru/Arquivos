import styled from 'styled-components' ;

export const ArquivosMain = styled.div`
    display : flex;
`

export const ContentMain = styled.div`
    width : calc(100vw - 250px);
    min-height : 100vh;

    @media (max-width: 690px) {
        width : 100vw ;
    }
`
export const ContentBody = styled.div`
    padding : 20px;
`