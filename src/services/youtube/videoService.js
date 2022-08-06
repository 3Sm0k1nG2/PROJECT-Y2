import { urls } from "../../process";
import * as request from '../requester';

const url = `${urls.YOUTUBE}/videos`;

export const get = (data) => request.get(url, data)
        .then(res => res.json());