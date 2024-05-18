import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import RideList from './components/RideList';
import CreateRide from './components/CreateRide';
import UserRides from './components/UserRides';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import RateRider from './components/RateRider'
import React from 'react';
import UserRating from './components/UserRating';
import RideAttendances from './components/RideAttendance';

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
                <Route path={'/profile'} element={<Profile/>} />
                <Route path={'/edit-profile'} element={<EditProfile/>} />
                <Route path={'/ride-attendance'} element={<RideAttendances rideId= {1} />} />
                <Route path={'/rate-rider'} element={<RateRider />} />
                <Route path={'/stars'} element={<UserRating />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;