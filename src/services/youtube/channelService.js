import { urls } from "../../process"

import * as request from '../requester';

const url = `${urls.YOUTUBE}/channels`;

export const get = (data) => {
    return request.get(url, data)
        .then(res => {console.log(res); return res.json()})
}
