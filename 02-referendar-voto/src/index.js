require( "dotenv" ).config();

const express = require( "express" );
const { router } = require( "./router" );

const server = express();

const port = 8000;

server.use( express.json() );
server.use( router );

server.listen( port, () => { 
    console.log(`O servidor está rodando na porta ${ port }.`);
} );
