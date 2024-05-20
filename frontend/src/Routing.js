import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import RideList from './components/RideList';
import CreateRide from './components/CreateRide';
import EditRide from './components/EditRide';
import UserRides from './components/UserRides';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import FrontPage from './components/FrontPage';
import React from 'react';
import RideAttendances from './components/RideAttendance';
import Header from './components/Header';
import RideListPreview from './components/RideList_copy';

function Routing(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={'/'} element={<FrontPage/>} />
                <Route path={'/login'} element={<Login/>} />
                <Route path={'/register'} element={<Register/>} />
                <Route path={'/rides'} element={<RideList/>} />
                <Route path={'/create-ride'} element={<CreateRide/>} />
                <Route path={'/edit-ride'} element={<EditRide/>}/>
                <Route path={'/user-rides'} element={<UserRides/>} />
                <Route path={'/profile'} element={<Profile/>} />
                <Route path={'/edit-profile'} element={<EditProfile/>} />
                <Route path={'/newRideBrowse'} element={<RideListPreview/>} />
                <Route path={'/ride-attendance'} element={<RideAttendances rideId= {1} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;