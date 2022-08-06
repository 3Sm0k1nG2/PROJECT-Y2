import * as process from '../process';


const methods = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    del: 'DELETE'
}

const requester = (method, url, data, token) => {

    if (method === methods.get) {
        if(!data){

            return fetch(url, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Referer': 'no-referrer'
                }
            });
        }

        data.key = process.env.REACT_APP_GOOGLE_API_KEY

        let queryParams = Object.entries(data).map(x => `${x[0]}=${x[1].replaceAll(', ', '%2C%20')}`);

        let urlWithQueryParams = `${url}?${queryParams.join('&')}`
        console.log(urlWithQueryParams);
        return fetch(urlWithQueryParams);
    }

    const headers = {}

    headers.Authorization = `Bearer ${token}`;
    headers['Content-Type'] = 'application/json';

    return fetch(url, {
        method,
        headers,
        body: JSON.stringify(data)
    });
}

export const get = requester.bind(null, methods.get);
export const post = requester.bind(null, methods.post);
export const put = requester.bind(null, methods.put);
export const del = requester.bind(null, methods.del);