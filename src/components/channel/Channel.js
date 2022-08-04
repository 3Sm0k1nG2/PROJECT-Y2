import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as channelService from '../../services/youtube/channelService';

export const Channel = () => {
    const { channelId } = useParams();
    const [channel, setChannel] = useState({});

    useEffect(() => {
        channelService.get({ part: 'snippet, statistics', id: channelId })
            .then(result => setChannel(result.items[0]));
    }, []);

    return (
        <>
            <h1>Channel</h1>
            <div>
                {channel.snippet &&
                    <img src={channel.snippet?.thumbnails.medium.url} />
                }
            </div>
        </>
    );
}