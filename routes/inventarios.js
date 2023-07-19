// '/api/inventarios'



const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarcampos');

const { 
    crearInventario, obtenerInventario, obtenerInventarioID, actualizarInventario, eliminarInventario
 } = require('../controllers/InventarioController');

const router = Router();

///////////////////////////////ruta Obtener inventario
    router.get('/', obtenerInventario );

/////////////////////////////////////ruta obtener por ID inventario
router.get('/:id', 
    [],
    
    obtenerInventarioID );

///////////////////////////////ruta crear inventario
    router.post('/', 
    [
        validarJWT,
        check('nombre', 'El nombre del objeto es requerido').not().isEmpty(),
        check('cantidad', 'La cantidad del objeto es requerida').not().isEmpty(),
        validarCampos
     ],
    crearInventario );

///////////////////////////////ruta actualizar inventario
    router.put('/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre del objeto es requerido').not().isEmpty(),
        check('cantidad', 'La cantidad del objeto es requerida').not().isEmpty(),
        validarCampos
    ],
    
    actualizarInventario );

///////////////////////////////ruta eliminar inventario
    router.delete('/:id', 
    validarJWT,
    eliminarInventario );


module.exports = router;