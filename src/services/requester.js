import * as process from '../process';

export const VALID_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DEL: 'DELETE'
};

const requester = (method, url, headers = {}, data = {}) => {

    if (!VALID_METHODS.hasOwnProperty(method))
        throw new Error(`Invalid method. Valid methods are: ${Object.values(VALID_METHODS).join(', ')}`);

    const options = {
        method,
        headers,
    }

    if(Object.values(data) > 0)
        options.body = JSON.stringify(data);

    return fetch(url, options);

    if (method === VALID_METHODS.get) {
        if (!data) {

            return fetch(url, {
                headers: {
                    ...headers,
                    'Access-Control-Allow-Origin': '*',
                    'Referer': 'no-referrer'
                }
            });
        }

        data.key = process.env.REACT_APP_GOOGLE_API_KEY

        // x[1].toString() may cause a BUG, when data isn't string or number.
        let queryParams = Object.entries(data).map(x => `${x[0]}=${x[1].toString().replaceAll(', ', '%2C%20')}`);

        let urlWithQueryParams = `${url}?${queryParams.join('&')}`
        console.log(urlWithQueryParams);
        return fetch(urlWithQueryParams, {
            headers
        });
    }

    headers = {
        'Content-Type': 'application/json',
        ...headers,
    }

    return fetch(url, {
        method,
        headers,
        body: JSON.stringify(data)
    });
}


export default {
    get: requester.bind(null, VALID_METHODS.GET),
    post: requester.bind(null, VALID_METHODS.POST),
    put: requester.bind(null, VALID_METHODS.PUT),
    del: requester.bind(null, VALID_METHODS.DEL)
};