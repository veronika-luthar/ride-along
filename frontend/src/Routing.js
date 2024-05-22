import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import RideList from './components/RideListOld';
import CreateRide from './components/CreateRide';
import EditRide from './components/EditRide';
import UserRides from './components/UserRides';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import RateRider from './components/RateRider'
import FrontPage from './components/FrontPage';
import React from 'react';
import RideAttendances from './components/RideAttendance';
import Header from './components/Header';
import RideListPreview from './components/RideList';
import UserList from './components/UserList';

function Routing(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={'/'} element={<FrontPage/>} />
                <Route path={'/login'} element={<Login/>} />
                <Route path={'/register'} element={<Register/>} />
                <Route path={'/create-ride'} element={<CreateRide/>} />
                <Route path={'/edit-ride'} element={<EditRide/>}/>
                <Route path={'/user-rides'} element={<UserRides/>} />
                <Route path={'/profile'} element={<Profile/>} />
                <Route path={'/edit-profile'} element={<EditProfile/>} />
                <Route path={'/rides'} element={<RideListPreview/>} />
                <Route path={'/ride-attendance'} element={<RideAttendances rideId= {1} />} />
                <Route path={'/rate-rider/:rideID'} element={<RateRider />} />
                <Route path={'/new-user'} element={<UserList />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;