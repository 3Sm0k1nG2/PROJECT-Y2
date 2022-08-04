import { useContext } from "react"
import { GoogleAuthContext } from "../contexts/GoogleAuthContext"

export const useGoogleAuthContext = () => {
    return useContext(GoogleAuthContext);
}  