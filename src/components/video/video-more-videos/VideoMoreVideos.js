import styles from './VideoMoreVideos.module.css'

import { VideoMoreVideosPreview } from "./video-more-videos-preview/VideoMoreVideosPreview";

export const VideoMoreVideos = () => {
    
    const videos = [];
    videos.length = 10;
    videos.fill(0);
    console.log(videos);
    
    return (
        <div className={styles['more-videos']}>
            {videos.map((x, i) => <VideoMoreVideosPreview key={i} {...x}/>)}
            {/* <h1>More Videos</h1> */}
        </div>
    );
}