

//ruta /api/eventos



const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarcampos');

const {  getEvento, getEventoId, crearEvento,  actualizarEvento, borrarEvento } = require('../controllers/EventoController');


const router = Router();

///////////////////////////////ruta Obtener Evento
router.get( '/', validarJWT, getEvento );
////////////////////////////////
//Obtener evento por Id
router.get( '/:id', validarJWT, getEventoId );

///////////////////////////////ruta crear Evento
router.post( '/', 
[
    validarJWT,
    check('nombre','El nombre del evento es requerido').not().isEmpty(),
    check('articulo', 'El id del articulo debe ser válido').isMongoId(),
    validarCampos
],
crearEvento 
);
///////////////////////////////

////////////////////////////////ruta actualizar Evento
router.put( '/:id', 
[
    validarJWT,
    check('nombre','El nombre del evento es requerido').not().isEmpty(),
    check('articulo', 'El id del articulo debe ser válido').isMongoId(),
    validarCampos
], 
actualizarEvento 
);
/////////////////////////////////

/////////////////////////////////////ruta eliminar Evento
router.delete( '/:id', 
validarJWT,
borrarEvento 
);
/////////////////////////////////////



module.exports = router;