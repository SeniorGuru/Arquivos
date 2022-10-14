import * as React from 'react' ;

import { useNavigate } from 'react-router-dom';

import Card from '../../shared/ui/Card';

import {
    RootDiv
} from './Styles/Staff.styles';

const Staff = () => {
    const navigate = useNavigate() ;

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
                label={'New Collaborator'}
                onClick={handleGoNew}
            />

            <Card 
                color='danger'
                label={'View Collaborator'}
                onClick={handleGoView}
            />

            <Card 
                color='success'
                label={'Edit Collaborator'}
                onClick={handleGoEdit}
            />
        </RootDiv>
        
    )
}

export default Staff ;