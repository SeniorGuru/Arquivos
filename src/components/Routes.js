import React, { memo } from "react";

import { Routes , Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Auth from '../pages/Auth' ;
import Arquivos from '../pages/Arquivos' ;

const Routing = () => {
    return (
        <Routes>
            <Route path="/*" element={< Landing />} />
            <Route path="/auth" element={< Auth />} />
            <Route path='/arquivos/*' element={<Arquivos />} />
        </Routes>
    );
}

Routing.propTypes = {
};

export default memo(Routing);
