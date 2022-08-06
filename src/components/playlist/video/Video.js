import { useState } from 'react';
import { Link } from 'react-router-dom';

import * as channelService from '../../../services/youtube/channelService';
import { Avatar } from './Avatar';

import { Spinner } from '../../common/spinner/Spinner';

export const Video = ({
    video
}) => {
    const [showAvatar, setShowAvatar] = useState(false);
    const [showDescription, setShowDescription] = useState(true);
    const [channel, setChannel] = useState(null);

    const loadChannel = () => {
        channelService.get({ part: 'snippet', id: video.channelId })
            .then(result => setChannel({ ...result.items?.[0].snippet, id: result.items?.[0].id }));
    }

    const channelPreviewHandler = async (e) => {
        console.log(e);

        if(e.type === 'touchstart')
            setShowDescription(false);

        if (!channel)
            await loadChannel();

        setShowAvatar(true);
    }

    const hideAvatar = (e) => {
        if(e.type === 'touchend')
            setShowDescription(true);

        setShowAvatar(false);
    }

    return (
        <div className='video'>
            <img className='thumbnail' src={video.thumbnails.medium.url} referrerPolicy="no-referrer" />

            <div className='avatar' hidden={!showAvatar}>
                {channel ?
                    <Avatar
                        channelId={channel.id}
                        avatarUrl={channel.thumbnails.default.url}
                        channelName={channel.title}
                    />
                    :
                    <Spinner />
                }
            </div>

            <div className='description'
                onTouchStart={channelPreviewHandler}
                onTouchEnd={hideAvatar}
                hidden={!showDescription}
            >
                <Link
                    to={`/channel/${video.channelId}`}
                    className='channelTitle'
                    onMouseEnter={channelPreviewHandler}
                    onMouseOut={hideAvatar}
                >
                    {video.channelTitle}
                </Link>

                <Link to={`/video/${video.id}`} className='title'>
                    {video.title}
                </Link>
            </div>
        </div>
    );
}