import { Video } from "./video/Video";

import './Playlist.css'

export const Playlist = ({
    title,
    videos
}) => {
    return (
        <div className="playlist">
            {title && <h1>{title}</h1>}
            <div className="videos">
                {videos.map(x => <Video key={x.id} video={{...x.snippet, id: x.id}} statistics={x.statistics} />)}
            </div>
        </div>
    );
}