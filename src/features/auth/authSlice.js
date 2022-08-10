import { createSlice } from '@reduxjs/toolkit'

import { env, scopes } from '../../process'

/* global google */

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: {
            client: {},
            accessToken: '',
            isSignedIn: false
        }
    },
    reducers: {
        initialize: (state) => {
            const client = google.accounts.oauth2.initTokenClient({
                client_id: env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: scopes.accountReadonly,
                callback: (tokenResponse) => {
                    if (!tokenResponse.access_token) {
                        state = {
                            accessToken: '',
                            isSignedIn: false
                        }
                        return;
                    }

                    state = {
                        accessToken: tokenResponse.access_token,
                        isSignedIn: true
                    }
                }
            })

            console.log(client);
            state.client = client;
        },
        requestAccessToken: (state) => {
            state.client.requestAccessToken();
        },
        signIn: (state, action) => {
            state = {
                ...state,
                accessToken: action.payload,
                isSignedIn: true
            }
        },
        signOut: (state) => {
            state = {
                ...state,
                accessToken: '',
                isSignedIn: false
            }
        }
    }
})

export const { initialize, requestAccessToken, signIn, signOut } = authSlice.actions

export default authSlice.reducer;