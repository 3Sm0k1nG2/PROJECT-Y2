import { Link } from 'react-router-dom';
import { useGoogleAuthContext } from '../../hooks/useGoogleAuthContext';

import './Navbar.css';

export const Navbar = () => {
    const { hasUser } = useGoogleAuthContext();

    return (
        <nav>
            <Link to="/" >Home</Link>
            <Link to="/login" >Login</Link>

            {hasUser &&
                <Link to="/logout" >Logout</Link>
            }
        </nav>
    );
}