import { Link } from 'react-router-dom';
import { useGoogleAuthContext } from '../../hooks/useGoogleAuthContext';

import styles from './Navbar.module.css';

import { post } from '../../services/youtubeService';

export const Navbar = () => {
    const { hasUser } = useGoogleAuthContext();

    // REMOVE LATER - only for testing purposes {
    const postNewCommentHandler = () => {
        post.commentThreadsByVideoId();
    }
    // }

    return (
        <nav>
            <Link to="/" >Home</Link>
            <Link to="/login" >Login</Link>

            {hasUser &&
                <Link to="/logout" >Logout</Link>
            }

            {/* REMOVE LATER - only for testing purposes { */}
            <Link to="/video/elkFVO1Alvk"> random video</Link>
            <button onClick={postNewCommentHandler}> Post new comment </button>
            {/* } */}
        </nav>
    );
}