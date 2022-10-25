const fsPromise = require( "fs/promises" );

const saveVote = async ( req, res ) => {
    try {
        const { ip } = req.params;
        const { votos } = req;
        const { voto } = req.body;

        votos.push( {
            ip,
            voto
        } );

        const votosStringify = JSON.stringify( votos );

        await fsPromise.writeFile( "./src/json/votos.json", votosStringify );

        return res.status( 200 ).json( `O voto do IP ${ ip } foi computado com sucesso.` );
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

const getAllVotes = async ( req, res ) => {
    try {
        const arquivoVotos = await fsPromise.readFile( "./src/json/votos.json" );

        // @ts-ignore
        const votos = JSON.parse( arquivoVotos );

        return res.status( 200 ).json( votos );
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
    saveVote,
    getAllVotes,
};
