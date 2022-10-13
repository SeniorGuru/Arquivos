import React, { memo } from "react";

import { Routes , Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Auth from '../pages/Auth' ;

const Routing = () => {
    return (
        <Routes>
            <Route path="/*" element={< Landing />} />
            <Route path="/auth" element={< Auth />} />
        </Routes>
    );
}

Routing.propTypes = {
};

export default memo(Routing);
