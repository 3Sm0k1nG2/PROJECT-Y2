import { useState, useEffect, } from "react";

import youtubeService from '../../services/youtubeService';

import { Playlist } from "./playlist/Playlist";
import { Categories } from "./categories/Categories";

export const Home = () => {
    const [error, setError] = useState(null);
    const [videos, setVideos] = useState(null);
    const [categories, setCategories] = useState([]);

    console.log(youtubeService);

    useEffect(() => {
        youtubeService.get.videoCategories({
            part: 'snippet',
            regionCode: 'US'
        })
            .then(result => setCategories(result.items.filter(x => x.snippet.assignable)))
    }, []);

    useEffect(() => { fetchVideos() }, [])

    function categoryOnClickHandler(videoCategoryId) {
        fetchVideos(videoCategoryId)
    }

    function fetchVideos(videoCategoryId = 0) {
        youtubeService.get.videos({
            part: 'snippet, statistics',
            chart: 'mostPopular',
            maxResults: 15,
            videoCategoryId: videoCategoryId
        })
            .then(result => {
                if (result.error) {
                    setError(result.error.message);
                    setVideos(null);
                }

                setError(null);
                setVideos(result.items);
            })
    }

    return (
        <>
            <h1>Home</h1>

            <Categories categoryOnClickHandler={categoryOnClickHandler} categories={categories} />

            {error &&
                <h2>{error}</h2>
            }

            {videos &&
                <>
                    <Playlist title={'Most popular videos'} videos={videos.slice(0, 5)} />
                    <Playlist videos={videos.slice(5, 10)} />
                    <Playlist videos={videos.slice(10)} />
                </>
            }
        </>
    );
} 