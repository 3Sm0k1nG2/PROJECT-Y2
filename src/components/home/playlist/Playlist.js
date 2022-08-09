import { Video } from "./video/Video";

import styles from './Playlist.module.css';

export const Playlist = ({
    title,
    videos
}) => {
    console.log(styles);

    return (
        <div className={styles.playlist}>
            {title && <h1>{title}</h1>}
            <div className={styles.videos}>
                {videos.map(x => <Video key={x.id} video={{...x.snippet, id: x.id}} statistics={x.statistics} />)}
            </div>
        </div>
    );
}