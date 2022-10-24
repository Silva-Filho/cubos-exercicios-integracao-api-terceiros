const express = require( "express" );

const { saveVote, getAllVotes } = require( "./controllers/election" );

const router = express();

router.post( "/votacao/:pais/:ip", saveVote );
router.get( "/votacao", getAllVotes );

module.exports = {
    router
};
