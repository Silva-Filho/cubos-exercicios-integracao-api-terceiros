// const fs = require( "fs" );
const fsPromise = require( "fs/promises" );

const { instanceAxios } = require( "../services/abstractApi" );

const getInfosEmpresas = async ( req, res ) => {
    try {
        const { dominioEmpresa } = req.params;
        const { empresas } = req;

        const { data: infosEmpresa } = await instanceAxios.get( `?domain=${dominioEmpresa}` );

        empresas.push( infosEmpresa );

        const empresasStringify = JSON.stringify( empresas );

        await fsPromise.writeFile( "./src/json/empresas.json", empresasStringify );

        return res.status( 200 ).json( `Dados da empresa do domínio ${dominioEmpresa} salvos com sucesso.` );
    } catch ( error ) {
        if ( error.response ) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log( error.response.data );
            console.log( error.response.status );
            console.log( error.response.headers );
            return res.status( 400 ).json( {
                error_response_data: error.response.data,
                error_response_status: error.response.status,
                error_response_headers: error.response.headers
            } );
        } else if ( error.request ) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log( error.request );
            return res.status( 400 ).json( error.request );
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log( "Error", error.message );
            return res.status( 400 ).json( error.message );
        }
    }
};

module.exports = {
    getInfosEmpresas,
};
