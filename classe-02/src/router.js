const express = require( "express" );

// Middlewares
const { verifyIp, verifyVote } = require( "./middlewares/election" );

// Controllers
const { saveVote, getAllVotes } = require( "./controllers/election" );

const router = express();

router.post(
    "/votacao/:pais/:ip", 
    verifyIp, 
    verifyVote, 
    saveVote
);
router.get( "/votacao", getAllVotes );

module.exports = {
    router
};
