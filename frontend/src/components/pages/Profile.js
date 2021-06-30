import React from 'react';
import { AuthService } from '../../util/authService'
import PageLayout from "./DefaultPage";


function Profile() {
    let auth = AuthService();
    console.log(auth)
    return (
        <PageLayout>
            <div>
                <div>user sign in</div>
            </div>
        </PageLayout>
    )
}

export default Profile;