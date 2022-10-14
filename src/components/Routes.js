import React, { memo } from "react";

import { Routes , Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Auth from '../pages/Auth' ;
import Arquivos from '../pages/Arquivos' ;

import ProtectedRoute from "../utils/ProtectedRoute";

const Routing = () => {
    return (
        <Routes>
            <Route path="/*" element={< Landing />} />
            <Route path="/auth" element={< Auth />} />
            <Route element={<ProtectedRoute />}>
                <Route path='/arquivos/*' element={<Arquivos />} />
            </Route>
        </Routes>
    );
}

Routing.propTypes = {
};

export default memo(Routing);
