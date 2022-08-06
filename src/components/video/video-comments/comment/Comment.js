import { Link } from "react-router-dom";

export const Comment = ({
    authorChannelUrl,
    authorDisplayName,
    authorProfileImageUrl,
    publishedAt,
    updatedAt,
    textDisplay,
    textOriginal,
    likeCount
}) => {

    return (
        <div>
            <Link to={`/channel/${authorChannelUrl}`} ><img src={authorProfileImageUrl} alt={`${authorDisplayName}'s avatar`}  referrerPolicy="no-referrer"/></Link>
            <h3>{authorDisplayName}</h3>
            <p>{`${(Date.now() - Date.parse(publishedAt))} *time* ago`}{(updatedAt !== publishedAt) && '(edited)'}</p>
            <p>{textOriginal}</p>
            {/* Actions */}
            <div>
                { /* USER-ACTIONS */}
                { /* Like */} {likeCount}
                { /* Dislike */}

                { /* OWNER-ACTIONS */}
                { /* Edit */}
                { /* Delete */}
            </div>
        </div>
    );
}