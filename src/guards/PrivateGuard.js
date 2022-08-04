import { Navigate, Outlet } from "react-router-dom"
import { useGoogleAuthContext } from "../hooks/useGoogleAuthContext"

export const PrivateGuard = ({ children }) => {
    const { hasUser } = useGoogleAuthContext();

    if (!hasUser)
        return <Navigate to="/login" />

    return children ? children : <Outlet />
}