import request, { VALID_METHODS } from './requester';

import { env, urls } from "../process";

const baseUrl = urls.YOUTUBE;

const VALID_RESOUCE_PATHS = {
    videos: 'videos',
    channels: 'channels',
    commentThreads: 'commentThreads',
    videoCategories: 'videoCategories',
    playlistItems: 'playlistItems'
}

const TOKEN_AUTHORIZATION_TYPE = 'Bearer';

const getAccessToken = () => {
    return localStorage.getItem('accessToken');
}

const reqYT = (isAuthorization, method, resourcePath, queryParams = {}, data = {}) => {

    // if (!VALID_METHODS.hasOwnProperty(method))
    //     throw new Error(`Invalid method. Valid methods are: ${Object.values(METHODS).join(', ')}`);

    console.log(isAuthorization, method, resourcePath, queryParams, data);

    if (!VALID_RESOUCE_PATHS.hasOwnProperty(resourcePath))
        throw new Error(`Invalid resource path. Valid paths are: ${Object.values(VALID_RESOUCE_PATHS).join(', ')}`);

    const headers = {};

    if (isAuthorization)
        headers.Authorization = TOKEN_AUTHORIZATION_TYPE + getAccessToken();

    if (Object.values(data).length > 0)
        headers['Content-Type'] = 'application/json';

    queryParams.key = env.REACT_APP_GOOGLE_API_KEY;

    const queryString = Object.entries(queryParams).map(x => `${x[0]}=${x[1].toString().replaceAll(', ', '%2C%20')}`).join('&');
    const url = baseUrl + '/' + resourcePath + '?' + queryString;

    return request[method.toLowerCase()](url, headers, data)    
        .then(res => res.json())
        .catch(err => {throw err});


    /* {
        part: 'snippet, statistics',
        chart: 'mostPopular',
        maxResults: 15,
        videoCategoryId: videoCategoryId
    } */
}

// youtubeService.get.videos(queryParams, data)
// youtubeService.authz.get.videos(queryParams, data)

const authzMethods = getBoundMethods(true);
const methods = getBoundMethods(false);

let authz = {}
for(let method in authzMethods){
    authz[method] = getBoundResources(authzMethods[method]);
}

let noAuthz = {};
for(let method in methods){
    noAuthz[method] = getBoundResources(methods[method]);
}

console.log('authz:', authz)
console.log('annon', noAuthz);

const postOriginal = {
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
};


/** @param {Boolean} isAuthorized */
function getBoundMethods(isAuthorized) {
    const methods = {};

    Object.values(VALID_METHODS).forEach(x => {
        methods[x.toLowerCase()] = reqYT.bind(
            null,
            isAuthorized,
            x.toLowerCase()
        );
    })

    return methods;
}

/** @param {String} method   */
function getBoundResources(methodToBeBound) {
    const resources = {};

    Object.values(VALID_RESOUCE_PATHS).forEach(x => {
        resources[x] = methodToBeBound.bind(null, x);
    });

    // console.log(resources);
    return resources;
}

export default {
    ...noAuthz,
    authz
};

