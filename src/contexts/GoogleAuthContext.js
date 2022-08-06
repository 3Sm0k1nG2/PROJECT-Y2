import { createContext, useState } from "react";
import jwtDecoder from 'jwt-decode';

import * as process from '../process';

export const GoogleAuthContext = createContext({});

export const GoogleAuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [hasUser, setHasUser] = useState(false);

    initialize();

    function initialize () {
        window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
        });
    };

    function handleCredentialResponse ({ credential }) {
        const user = jwtDecoder(credential);
        setUser(user);
        setHasUser(true);
    };

    const renderSignButtonInDiv = (elementDivId) => {
        window.google.accounts.id.renderButton(
            document.getElementById(elementDivId),
            { theme: "outline", size: "large" }
        );
    }

    const signOutHandler = () => {
        setUser({});
        setHasUser(false);
    }

    return (
        <GoogleAuthContext.Provider value={{ user, hasUser, renderSignButtonInDiv, signOutHandler }}>
            {children}
        </GoogleAuthContext.Provider>
    )
}

