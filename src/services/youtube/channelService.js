import { urls } from "../../process"

import * as request from '../requester';

const url = `${urls.YOUTUBE}/channels`;

export const get = (data) => request.get(url, data)
        .then(res => res.json());