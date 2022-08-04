import { Video } from "./Video";

import './Slider.css'

export const Slider = ({
    title,
    videos
}) => {
    return (
        <div className="slider">
            <h1>{title}</h1>
            <div>
                {videos.map(x => <Video key={x.id} {...x} />)}
            </div>
        </div>
    );
}