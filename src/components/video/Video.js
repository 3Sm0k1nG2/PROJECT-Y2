import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as videoService from '../../services/youtube/videoService';

const youtubeWatchUrl = 'https://www.youtube.com/embed'
const autoPlay = '?autoplay=1';

export const Video = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState({});

    useEffect(() => {
        videoService.get({
            part: 'snippet, statistics',
            id: videoId
        }).then(result => { setVideo(result.items[0]) });
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <iframe id="ytplayer" type="text/html" width="1280" height="720"
                src={`${youtubeWatchUrl}/${video.id}${autoPlay}`}
                frameBorder="0"></iframe>
        </div>
    );
}