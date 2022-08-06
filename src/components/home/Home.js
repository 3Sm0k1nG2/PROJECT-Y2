import { useState, useEffect, } from "react";

import * as youtubeService from '../../services/youtube/videoService';
import { Playlist } from "../playlist/Playlist";

export const Home = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        youtubeService.get({
            part: 'snippet, statistics',
            chart: 'mostPopular'
        })
            .then(result => setVideos(result.items))
    }, [])

    return (
        <>
            <h1>Home</h1>

            <Playlist title={'Most popular videos'} videos={videos} />
            <Playlist videos={videos} />
            <Playlist videos={videos} />
        </>
    );
} 