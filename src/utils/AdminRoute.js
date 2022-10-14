import React from 'react';

import { Navigate , Outlet } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

const AdminRoute = (props) => {
    const {
        profile
    } = useAuth() ;

    if (profile?.position !== 'admin') return <Navigate to="/arquivos/" />;
    return <Outlet />
}

export default AdminRoute ;