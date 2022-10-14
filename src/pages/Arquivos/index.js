import * as React from 'react' ;

import { Route , Routes } from 'react-router-dom' ;

import Staff from './Staff';
import Dashboard from './Dashboard';
import ViewCollaborator from '../../components/Staff/ViewCollaborator';
import EditCollaborator from '../../components/Staff/EditCollaborator';
import NewCollaborator from '../../components/Staff/NewCollaborator';
import Pending from './Pending';
import Report from './Report';

import AdminRoute from '../../utils/AdminRoute';

import Navbar from '../../components/Layouts/Navbar';
import Menubar from '../../components/Layouts/Menubar';

import {
    ArquivosMain,
    ContentMain,
    ContentBody
} from './Styles/index.styles';

import { useMediaQuery } from '@mui/material';

const Aruqivos = () => {
    const match690 = useMediaQuery('(min-width : 690px)') ;

    return (
        <ArquivosMain>
            { match690 && <Navbar /> }
            <ContentMain>
                <Menubar />
                <ContentBody>
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route element={<AdminRoute />}>
                            <Route path='/staff/new-collaborator' element={<NewCollaborator />}/>
                            <Route path='/staff/view-collaborator' element={<ViewCollaborator />}/>
                            <Route path='/staff/edit-collaborator' element={<EditCollaborator />}/>
                            <Route path='/staff/*' element={<Staff />} />
                        </Route>
                        <Route path='/pending' element={<Pending />} />
                        <Route path='/report' element={<Report/>} />
                    </Routes>
                </ContentBody>
            </ContentMain>
        </ArquivosMain>
    )
}

export default Aruqivos ;