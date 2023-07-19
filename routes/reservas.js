// '/api/reservas'



const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarcampos');

const { 
    getReserva,
    crearReserva,
    actualizarReserva,
    borrarReserva
 } = require('../controllers/ReservaController');

const router = Router();

///////////////////////////////ruta Obtener reserva
    router.get('/', getReserva );


///////////////////////////////ruta crear reserva
    router.post('/', 
    [
      validarJWT,
      check('nombre', 'El nombre de la reserva es requerida').not().isEmpty(),   
      check('fecha', 'La fecha es requerida').not().isEmpty(),
       validarCampos     
     ],
     crearReserva );

     ///////////////////////////////ruta actualizar reserva
    router.put('/:id', 
    [
      validarJWT,
      check('nombre', 'El nombre de la reserva es requerida').not().isEmpty(),   
      check('fecha', 'La fecha es requerida').not().isEmpty(),
       validarCampos   
    ],
    actualizarReserva );

///////////////////////////////ruta eliminar reserva
    router.delete('/:id',
    validarJWT, 
    borrarReserva );


module.exports = router;