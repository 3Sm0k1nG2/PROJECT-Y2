import './App.css';

import { Route, Routes } from 'react-router-dom';
import { PrivateGuard } from './guards/PrivateGuard';

import { Navbar } from './components/navbar/Navbar';

import { Home } from './components/home/Home';
import { Login } from './components/auth/login/Login';
import { Logout } from './components/auth/logout/Logout';
import { GoogleAuthProvider } from './contexts/GoogleAuthContext';
import { Video } from './components/video/Video';
import { Channel } from './components/channel/Channel';

import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { initialize } from './features/auth/authSlice';

export default function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initialize());
    },[])

    return (
        // <GoogleAuthProvider>
        <>
            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />

                    <Route element={<PrivateGuard />}>
                        <Route path="/logout" element={<Logout />} />
                    </Route>

                    <Route path="/video/:videoId" element={<Video />}></Route>
                    <Route path="/channel/:channelId" element={<Channel />}></Route>

                    <Route path="*" element={<h1>Not Found!</h1>} />
                </Routes>
            </main>
        </>
        // </GoogleAuthProvider>
    );
}