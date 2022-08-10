import { createContext, useState, useEffect } from "react";
import jwtDecoder from 'jwt-decode';

import { env, scopes } from '../process';

import { useLocalStorage } from '../hooks/useLocalStorage';

export const GoogleAuthContext = createContext({});

export const GoogleAuthProvider = ({ children }) => {
    /* global google */

    const [user, setUser] = useState({});
    const [hasUser, setHasUser] = useState(false);

    const [client, setClient] = useState({});
    const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

    useEffect(() => { initialize() }, []);

    const initialize = () => {
        // Authentication
        google.accounts.id.initialize({
            client_id: env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
        });

        // Authorization
        const client = google.accounts.oauth2.initTokenClient(
            {
                client_id: env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: scopes.accountReadonly,
                callback: (tokenResponse) => {
                    console.log('tokenResponse: ', tokenResponse)
                    setAccessToken(tokenResponse.access_token);
                    if (tokenResponse && tokenResponse.access_token) {
                        window.gapi.client.setApiKey(env.REACT_APP_GOOGLE_API_KEY);
                        console.log(window.gapi);
                        // window.gapi.client.load('calendar', 'v3', listUpcomingEvents);
                    }
                },
            }
        )

        setClient(client);
    };


    function listUpcomingEvents() {
        window.gapi.client.calendar.events.list();
    }

    function handleCredentialResponse({ credential }) {
        console.log(credential);
        const user = jwtDecoder(credential);
        setUser(user);

        setHasUser(true);
    };

    const renderSignButtonInDiv = (elementDivId) => {
        // initialize() must be asynchronous, 
        // so this function has to be asynchronous too
        setTimeout(() => {
            google.accounts.id.renderButton(
                document.getElementById(elementDivId),
                { theme: "outline", size: "large" }
            );
        }, 0)
    }

    function authorizeHandler() {
        client.requestAccessToken();
    }

    const signOutHandler = () => {
        setUser({});
        setHasUser(false);
        setAccessToken('');
    }

    return (
        <GoogleAuthContext.Provider value={{ user, hasUser, renderSignButtonInDiv, signOutHandler, requestAccessToken: authorizeHandler, client, accessToken }}>
            {children}
        </GoogleAuthContext.Provider>
    )
}

