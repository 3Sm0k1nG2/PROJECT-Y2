import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as youtubeService from '../../services/youtubeService';

export const Channel = () => {
    const { channelId } = useParams();
    const [channel, setChannel] = useState({});

    useEffect(() => {
        youtubeService.get.channel({ part: 'snippet, statistics', id: channelId })
            .then(result => {setChannel(result.items?.[0])});
    }, []);


    if(!channel){
        return (
            <h1> Channel not found! </h1>
        );
    }

    return (
        <>
            <h1>Channel</h1>
            <div>
                {channel.snippet &&
                    <img src={channel.snippet?.thumbnails.medium.url} referrerPolicy="no-referrer"/>
                }
            </div>
        </>
    );
}