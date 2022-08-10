import { Link } from 'react-router-dom';
import { useGoogleAuthContext } from '../../hooks/useGoogleAuthContext';
import styles from './Navbar.module.css';

import youtubeService from '../../services/youtubeService';

export const Navbar = () => {
    const { hasUser } = useGoogleAuthContext();

    // REMOVE LATER - only for testing purposes {
    const postNewCommentHandler = () => {
        youtubeService.authz.post.commentThreads(
            {
                part: "snippet",
                alt: "json"
            },
            {
                snippet: {
                    videoId: 'elkFVO1Alvk',
                    topLevelComment: {
                        snippet: {
                            textOriginal: 'testing ....'
                        }
                    }
                }
            })
    };

    return (
        <nav>
            <Link to="/" >Home</Link>
            <Link to="/login" >Login</Link>

            {hasUser &&
                <>
                    <Link to="/logout" >Logout</Link>
                    {/* REMOVE LATER - only for testing purposes { */}
                    <button onClick={postNewCommentHandler}> Post new comment </button>
                    {/* */}
                </>
            }

            {/* REMOVE LATER - only for testing purposes { */}
            <Link to="/video/elkFVO1Alvk"> random video</Link>
            {/* } */}
        </nav>
    );
}