import * as process from '../process';


const methods = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    del: 'DELETE'
}

const requester = (method, url, data, token) => {

    if (method === methods.get) {
        data.key = process.env.REACT_APP_GOOGLE_API_KEY

        let queryParams = '';

        for (let key in data) {
            queryParams += `${key}=${data[key].replace(', ','%2C')}&`;
        }
        queryParams = queryParams.slice(0,-1);

        console.log(queryParams);
        // console.log(queryParams.join('&'));

        let urlWithQueryParams = `${url}?${queryParams}`
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