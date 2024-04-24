import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import RideList from './components/RideList';
import CreateRide from './components/CreateRide';
import UserRides from './components/UserRides';
import React from 'react';

function Routing(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Landing/>} />
                <Route path={'/login'} element={<Login/>} />
                <Route path={'/register'} element={<Register/>} />
                <Route path={'/rides'} element={<RideList/>} />
                <Route path={'/create-ride'} element={<CreateRide/>} />
                <Route path={'/user-rides'} element={<UserRides/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;