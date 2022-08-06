

const youtubeWatchUrl = 'https://www.youtube.com/embed'
const autoPlay = '?mute=1&autoplay=1&rel=1';

export const Player = ({
    title,
    videoId
}) => {
    
    if(!videoId)
        return (<h1> Video not found! </h1>);

    return (
        <iframe
            title={title}
            id="ytplayer" type="text/html"
            src={`${youtubeWatchUrl}/${videoId}${autoPlay}`}
            frameBorder="1"
            allowFullScreen
            allow="autoplay"
            autoPlay
        />
    );
}