const express = require( "express" );

const { getInfosEmpresas } = require( "./controllers/infosCompanys" );

const router = express();

router.get( "/empresas/:dominioEmpresa", getInfosEmpresas );

module.exports = {
    router
};
