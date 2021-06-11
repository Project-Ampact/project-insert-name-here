import React from 'react';
import { AuthService } from '../../util/authService'
import NavigationBar from '../NavigationBar'

function Profile() {
    let auth = AuthService();
    console.log(auth)
    return (
        <div>
            <div><NavigationBar/>user sign in</div>
        </div>
    )
}

export default Profile;