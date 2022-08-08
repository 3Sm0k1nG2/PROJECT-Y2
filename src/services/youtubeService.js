import * as request from './requester';

import { urls } from "../process";

const baseUrl = urls.YOUTUBE;

const get = {
    videos: (data) => {

        return request.get(`${baseUrl}/videos`, data)
            .then(res => res.json())
            .catch(err => { throw err });
    },

    channel: (data) => {
        return request.get(`${baseUrl}/channels`, data)
            .then(res => res.json())
            .catch(err => { throw err });
    },

    commentThreads: (data) => {
        return request.get(`${baseUrl}/commentThreads`, data)
            .then(res => res.json())
            .catch(err => { throw err });
    },

    videoCategories: (data) => {
        return request.get(`${baseUrl}/videoCategories`, data)
            .then(res => res.json())
            .catch(err => { throw err });
    },
}

export {
    get
}