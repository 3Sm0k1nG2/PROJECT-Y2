import { useEffect } from "react";

import styles from './Login.module.css';

import { useSelector, useDispatch } from 'react-redux';

import { useGoogleAuthContext } from "../../../hooks/useGoogleAuthContext";
import { requestAccessToken } from "../../../features/auth/authSlice";

export const Login = () => {
    const { hasUser } = useSelector(state => state.googleAuth)
    const dispatch = useDispatch();
    // const { hasUser, /* renderSignButtonInDiv, */ requestAccessToken } = useGoogleAuthContext();

    // useEffect(() => {
    //     renderSignButtonInDiv(styles['sign-in']);
    // }, []);

    function handleSignIn() {
        dispatch(requestAccessToken())
    }

    return (
        <>
            <h1>Login</h1>
            {/* <div id={styles['sign-in']} /> */}
            <button onClick={handleSignIn}>{hasUser ? 'Signed as ...' : 'Sign in with YouTube'}</button>

            {/* {hasUser &&
                <div className={styles['signed-section']}>
                    <h3> Currently logged as: </h3>
                    <img src={user.picture} alt={user.name} referrerPolicy="no-referrer" />
                </div>
            } */}


        </>
    )
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}