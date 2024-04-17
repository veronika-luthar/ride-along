import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import React from 'react';

function Routing(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Landing/>} />
                <Route path={'/login'} element={<Login/>} />
                <Route path={'/register'} element={<Register/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;