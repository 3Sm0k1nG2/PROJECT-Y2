import { useEffect } from 'react';
import { useGoogleAuthContext } from "../../../hooks/useGoogleAuthContext";

export const Logout = () => {
    const { signOutHandler } = useGoogleAuthContext();

    useEffect(signOutHandler, [])
}