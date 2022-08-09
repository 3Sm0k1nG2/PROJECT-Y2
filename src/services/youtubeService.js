import * as request from './requester';

import { urls } from "../process";

const baseUrl = urls.YOUTUBE;

const reqYT = (resourcePath, data) => {
    return request.get(`${baseUrl}/${resourcePath}`, data)
        .then(res => res.json())
        .catch(err => { throw err });
}

const get = {
    videos: reqYT.bind(null, 'videos'),
    channels: reqYT.bind(null, 'channels'),
    commentThreads: reqYT.bind(null, 'commentThreads'),
    videoCategories: reqYT.bind(null, 'videoCategories'),
    playlistItems: reqYT.bind(null, 'playlistItems')
}

const post = {
    commentThreadsByVideoId: (videoId = urls.TEST_VIDEO_ID, message = "testing...") => {
        return request.post(`${baseUrl}/commentThreads`, {
            "snippet": {
                "videoId": videoId,
                "topLevelComment": {
                    "snippet": {
                        "textOriginal": message
                    }
                }
            }
        })
            .then(res => res.json())
            .catch(err => { throw err });
    }
}

export {
    get,
    post
}