

//ruta /api/articulos



const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarcampos');

const { getArticulo, crearArticulo, actualizarArticulo, borrarArticulo } = require('../controllers/ArticuloController');


const router = Router();

///////////////////////////////ruta Obtener articulos
router.get( '/', getArticulo );
////////////////////////////////

///////////////////////////////ruta crear articulo
router.post( '/', 
[
    validarJWT,
    check('producto', 'El nombre del artículo es requerido').not().isEmpty(),
    check('cantidad', 'La cantidad del artículo es requerida').not().isEmpty(),
    validarCampos
],
 crearArticulo 
);
///////////////////////////////

////////////////////////////////ruta actualizar articulo
router.put( '/:id', 
[
    validarJWT,
    check('producto', 'El nombre del artículo es requerido').not().isEmpty(),
    check('cantidad', 'La cantidad del artículo es requerida').not().isEmpty(),
    validarCampos
], 
actualizarArticulo 
);
/////////////////////////////////

/////////////////////////////////////ruta eliminar articulo
router.delete( '/:id', 
validarJWT,
borrarArticulo 
);
/////////////////////////////////////


module.exports = router;