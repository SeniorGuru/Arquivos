import * as React from 'react' ;

import { Route , Routes } from 'react-router-dom' ;

import Staff from './Staff';
import Dashboard from './Dashboard';
import ViewCollaborator from '../../components/Staff/ViewCollaborator';
import EditCollaborator from '../../components/Staff/EditCollaborator';
import NewCollaborator from '../../components/Staff/NewCollaborator';

import Navbar from '../../components/Layouts/Navbar';
import Menubar from '../../components/Layouts/Menubar';

import {
    ArquivosMain,
    ContentMain,
    ContentBody
} from './Styles/index.styles';

const Aruqivos = () => { 
    return (
        <ArquivosMain>
            <Navbar />
            <ContentMain>
                <Menubar />
                <ContentBody>
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/staff/new-collaborator' element={<NewCollaborator />}/>
                        <Route path='/staff/view-collaborator' element={<ViewCollaborator />}/>
                        <Route path='/staff/edit-collaborator' element={<EditCollaborator />}/>
                        <Route path='/staff/*' element={<Staff />} />
                    </Routes>
                </ContentBody>
            </ContentMain>
        </ArquivosMain>
    )
}

export default Aruqivos ;