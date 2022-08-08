import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import './Video.css';

import * as youtubeService from '../../services/youtubeService';

import { Spinner } from "../common/spinner/Spinner";
import { Player } from "../common/player/Player";

import { VideoMoreVideos } from "./video-more-videos/VideoMoreVideos";
import { VideoDescription } from "./video-description/VideoDescription";
import { VideoComments } from "./video-comments/VideoComments";

export const Video = () => {
    const [isLoading, setIsLoading] = useState(true);

    const { videoId } = useParams();
    const [video, setVideo] = useState({});

    const [comments, setComments] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        if (!videoId)
            return;

        youtubeService.get.channel({
            part: 'snippet, statistics',
            id: videoId
        })
            .then(result => { setVideo(result.items[0] || {}) })
            .finally(() => { setIsLoading(false) });

        youtubeService.get.commentThread({
            part: 'snippet',
            videoId: videoId
        })
            .then(result => { setComments(result.items || []) })
    }, []);

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="video">
            <Player title={video.title} videoId={video.id} />
            <VideoMoreVideos />
            <VideoDescription description={video.description} />
            <VideoComments comments={comments} />
        </div>
    );
}