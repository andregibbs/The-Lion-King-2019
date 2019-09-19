//ref: https://stackoverflow.com/questions/46946380/fetch-api-request-timeout
require('es6-promise').polyfill();
require('isomorphic-fetch');

export default function (url, options, timeout = 7000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}