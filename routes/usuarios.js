//ruta /api/usuarios

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarioController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarcampos');


const router = Router();

///////////////////////////////ruta Obtener usuarios
router.get( '/', validarJWT, getUsuarios );
////////////////////////////////

///////////////////////////////ruta crear usuario
router.post( '/', 
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
]
, crearUsuario 
);
///////////////////////////////

////////////////////////////////ruta actualizar usuario
router.put( '/:id', 
[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
], 
actualizarUsuario 
);
/////////////////////////////////

/////////////////////////////////////ruta eliminar usuario
router.delete( '/:id', 
    validarJWT,
    borrarUsuario 
);
/////////////////////////////////////


module.exports = router;