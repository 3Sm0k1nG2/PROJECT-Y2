import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from './Video.module.css';

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
    const [channel, setChannel] = useState({});
    const [comments, setComments] = useState([]);
    const [moreVideos, setMoreVideos] = useState([]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            if (!videoId)
                return;

            const video = (await youtubeService.get.videos({
                part: 'snippet, statistics',
                id: videoId
            })).items[0] || {};

            setVideo(video);
            setIsLoading(false);

            const channel = (await youtubeService.get.channels({
                part: 'snippet',
                id: video.snippet.channelId
            })).items[0] || {};

            setChannel(channel);

            const comments = (await youtubeService.get.commentThreads({
                part: 'snippet',
                videoId: video.id
            })).items || [];

            setComments(comments);

            const moreVideos = (await youtubeService.get.playlistItems({
                part: 'snippet',
                playlistId: channel.id
            })).items || [];

            setMoreVideos(moreVideos);
        })()
    }, []);

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className={styles.video}>
            <div className={styles.primary}>
                <Player title={video.title} videoId={video.id} />
                <VideoDescription description={video.description} channel={channel} />
                <VideoComments comments={comments} />
            </div>
            <div className={styles.secondary}>
                <VideoMoreVideos videos={moreVideos} />
            </div>
        </div>
    );
}

/*
{
  "kind": "youtube#videoListResponse",
  "etag": "5itw3WbnGatDHv78i2-qvRz17f8",
  "items": [
    {
      "kind": "youtube#video",
      "etag": "F_y2E5fkMwFbe7EtDIOZfXfFrhM",
      "id": "pQcFCFZIuZI",
      "snippet": {
        "publishedAt": "2022-08-08T06:30:11Z",
        "channelId": "UC3XTzVzaHQEd30rQbuvCtTQ",
        "title": "Monkeypox: Last Week Tonight with John Oliver (HBO)",
        "description": "John Oliver discusses the recent monkeypox outbreak in the U.S., how we’ve fumbled our response to it, and some aspirations for this coming autumn.\n\nConnect with Last Week Tonight online... \n\nSubscribe to the Last Week Tonight YouTube channel for more almost news as it almost happens: www.youtube.com/lastweektonight \n\nFind Last Week Tonight on Facebook like your mom would: www.facebook.com/lastweektonight \n\nFollow us on Twitter for news about jokes and jokes about news: www.twitter.com/lastweektonight \n\nVisit our official site for all that other stuff at once: www.hbo.com/lastweektonight",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/pQcFCFZIuZI/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/pQcFCFZIuZI/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/pQcFCFZIuZI/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "LastWeekTonight",
        "categoryId": "24",
        "liveBroadcastContent": "none",
        "localized": {
          "title": "Monkeypox: Last Week Tonight with John Oliver (HBO)",
          "description": "John Oliver discusses the recent monkeypox outbreak in the U.S., how we’ve fumbled our response to it, and some aspirations for this coming autumn.\n\nConnect with Last Week Tonight online... \n\nSubscribe to the Last Week Tonight YouTube channel for more almost news as it almost happens: www.youtube.com/lastweektonight \n\nFind Last Week Tonight on Facebook like your mom would: www.facebook.com/lastweektonight \n\nFollow us on Twitter for news about jokes and jokes about news: www.twitter.com/lastweektonight \n\nVisit our official site for all that other stuff at once: www.hbo.com/lastweektonight"
        },
        "defaultAudioLanguage": "en-US"
      }
    }
  ],
  "pageInfo": {
    "totalResults": 1,
    "resultsPerPage": 1
  }
}

*/