import { useState, useEffect, } from "react";

import * as youtubeService from '../../services/youtube/videoService';
import { Slider } from "./videos/slider/Slider";

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

            <Slider title={'Most popular videos'} videos={videos} />
        </>
    );
} 