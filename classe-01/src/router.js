const express = require( "express" );

// Middlewares
const { verifyDomain } = require( "./middlewares/infosCompany" );

// Controllers
const { getInfosEmpresas } = require( "./controllers/infosCompanys" );

const router = express();

router.get(
    "/empresas/:dominioEmpresa",
    verifyDomain,
    getInfosEmpresas
);

module.exports = {
    router
};
