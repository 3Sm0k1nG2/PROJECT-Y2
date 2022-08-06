import { urls } from "../../process";

import * as request from '../requester';

const url = `${urls.YOUTUBE}/commentThreads`;

export const get = (data) => request.get(url, data)
    .then(res => res.json())