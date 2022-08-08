import { Link } from "react-router-dom";

import { Spinner } from "../../../common/spinner/Spinner"

export const Avatar = ({
    channelId,
    avatarUrl,
    channelName
}) => {
    if (!channelId) {
        return <Spinner />
    }

    return (
        <Link to={`/channel/${channelId}`}>
            <img
                src={avatarUrl}
                alt={`${channelName}'s Preview`}
                referrerPolicy="no-referrer"
            />
        </Link>
    )
}