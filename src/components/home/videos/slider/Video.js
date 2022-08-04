import { useCallback, useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';

import './Slider.css'

import * as channelService from '../../../../services/youtube/channelService';

export const Video = ({
    id,
    snippet,
}) => {
    const [showAvatar, setShowAvatar] = useState(false);
    const [channel, setChannel] = useState({});

    const loadChannel = () => {
        channelService.get({ part: 'snippet', id: snippet.channelId })
            .then(result => setChannel(result.items[0]));
    }

    const channelPreviewHandler = async () => {
        if (Object.keys(channel).length === 0)
            await loadChannel();

        setShowAvatar(true);
    }

    const hideAvatar = () => {
        setShowAvatar(false);
    }

    return (
        <Link to={`/video/${id}`} className='video'>
            <div className='thumbnail'>
                <img src={snippet.thumbnails.medium.url} referrerPolicy="no-referrer" />
            </div>

            <div hidden={!showAvatar}>
                <Link to={`/channel/${snippet.channelId}`}>
                    <img
                        className='avatar'
                        src={channel.snippet?.thumbnails.default.url}
                        alt={`${snippet.channelTitle}'s Preview`}
                        referrerPolicy="no-referrer" />
                </Link>
            </div>

            <div className='description'>
                <Link
                    to={`/channel/${snippet.channelId}`}
                    className='channelTitle'
                    onPointerOver={channelPreviewHandler}
                    onMouseOut={hideAvatar}>{snippet.channelTitle}
                </Link>

                <p className='title'>{snippet.title}</p>
            </div>
        </Link>
    );
}