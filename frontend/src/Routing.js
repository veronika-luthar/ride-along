import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import RideList from './components/RideList';
import CreateRide from './components/CreateRide';
import EditRide from './components/EditRide';
import UserRides from './components/UserRides';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
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
                <Route path={'/edit-ride'} element={<EditRide/>}/>
                <Route path={'/user-rides'} element={<UserRides/>} />
                <Route path={'/profile'} element={<Profile/>} />
                <Route path={'/edit-profile'} element={<EditProfile/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;