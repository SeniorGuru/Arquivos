import * as React from 'react' ;

import { useNavigate } from 'react-router-dom';
import { useTranslate } from '../../contexts/language';

import Card from '../../shared/ui/Card';

import {
    RootDiv
} from './Styles/Staff.styles';

const Staff = () => {
    const navigate = useNavigate() ;

    const {
        sysLang
    } = useTranslate() ;

    const handleGoNew = () => {
        navigate('/arquivos/staff/new-collaborator') ;
    }

    const handleGoView = () => {
        navigate('/arquivos/staff/view-collaborator') ;
    }

    const handleGoEdit = () => {
        navigate('/arquivos/staff/edit-collaborator') ;
    }

    return (
        <RootDiv>
            <Card 
                color='primary'
                label={sysLang['newcollaborator']}
                onClick={handleGoNew}
            />

            <Card 
                color='danger'
                label={sysLang['viewcollaborator']}
                onClick={handleGoView}
            />

            <Card 
                color='success'
                label={sysLang['editcollaborator']}
                onClick={handleGoEdit}
            />
        </RootDiv>
        
    )
}

export default Staff ;