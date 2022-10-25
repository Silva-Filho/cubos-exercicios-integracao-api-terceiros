const axios = require( "axios" ).default;

const instanceAxios = axios.create( {
    /* method: 'get', */
    baseURL: "https://ipgeolocation.abstractapi.com/v1/",
    params: {
        api_key: process.env.API_KEY
    }
} );

module.exports = {
    instanceAxios
};
