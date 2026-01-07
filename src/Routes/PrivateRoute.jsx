import React from 'react'
import useAuth from '../Hooks/UseAuth'
import { Navigate, useLocation } from 'react-router';

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();
    // console.log("Current location is the",location)

    if (loading) {
        return <div>
            <span className="loading loading-infinity loading-xs"></span>
            <span className="loading loading-infinity loading-sm"></span>
            <span className="loading loading-infinity loading-md"></span>
            <span className="loading loading-infinity loading-lg"></span>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }
    if(!user){

        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
    return children;
}
