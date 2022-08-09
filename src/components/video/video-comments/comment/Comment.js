import { Link } from "react-router-dom";
import { useGoogleAuthContext } from "../../../../hooks/useGoogleAuthContext";
import { Like } from "../../../common/like/Like";

import styles from './Comment.module.css';

export const Comment = ({
    authorChannelId,
    authorDisplayName,
    authorProfileImageUrl,
    publishedAt,
    updatedAt,
    textDisplay,
    textOriginal,
    likeCount
}) => {
    const auth = useGoogleAuthContext();

    console.log(auth);

    return (
        <div className={styles.comment}>
            <Link to={`/channel/${authorChannelId}`} ><img src={authorProfileImageUrl} alt={`${authorDisplayName}'s avatar`} referrerPolicy="no-referrer" /></Link>
            <h3>{authorDisplayName}</h3>
            <p>{`${(Date.now() - Date.parse(publishedAt))} milliseconds ago`}{(updatedAt !== publishedAt) && '(edited)'}</p>
            <p>{textOriginal}</p>

            {/* Actions */}
            <div className={styles.actions}>
                { /* USER-ACTIONS */}
                <Like />
                {likeCount ? likeCount : ''}
                <Like className={`rotate-180`} />

                <p>Reply</p>

                { /* OWNER-ACTIONS */}
                { }

                { /* Edit */}
                { /* Delete */}
            </div>
        </div>
    );
}