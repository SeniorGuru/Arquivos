import * as React from 'react' ;

import { Route , Routes } from 'react-router-dom' ;

import Dashboard from './Dashboard';
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
                    </Routes>
                </ContentBody>
            </ContentMain>
        </ArquivosMain>
    )
}

export default Aruqivos ;