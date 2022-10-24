const axios = require( "axios" );

// @ts-ignore
const instanceAxios = axios.create( {
    baseURL: "https://companyenrichment.abstractapi.com/v1/",
    params: {
        // @ts-ignore
        api_key: process.env.API_KEY
        
    }
} );

module.exports = {
    instanceAxios
};
