import { createContext, useState, useEffect } from "react";
import jwtDecoder from 'jwt-decode';

import { env, scopes } from '../process';

import { useLocalStorage } from '../hooks/useLocalStorage';

export const GoogleAuthContext = createContext({});

export const GoogleAuthProvider = ({ children }) => {
    /* global google */

    const [client, setClient] = useState({});
    const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
    const [hasUser, setHasUser] = useState(false);

    useEffect(() => { initialize() }, []);

    useEffect(() => {setHasUser(Boolean(accessToken))}, [accessToken])

    const initialize = () => {
        // Authorization
        const client = google.accounts.oauth2.initTokenClient({
            client_id: env.REACT_APP_GOOGLE_CLIENT_ID,
            scope: scopes.accountReadonly,
            callback: handleTokenClient
        })

        setClient(client);
    };

    function handleTokenClient(tokenResponse) {
        console.log('tokenResponse: ', tokenResponse)

        if(!tokenResponse.access_token){
            signOutHandler();
            return;
        }

        setAccessToken(tokenResponse.token_type + ' ' + tokenResponse.access_token);
    }


    function listUpcomingEvents() {
        window.gapi.client.calendar.events.list();
    }

    function authorizeHandler() {
        client.requestAccessToken();
    }

    const signOutHandler = () => {
        setAccessToken('');
    }

    return (
        <GoogleAuthContext.Provider value={{ hasUser, signOutHandler, requestAccessToken: authorizeHandler, client, accessToken }}>
            {children}
        </GoogleAuthContext.Provider>
    )
}

