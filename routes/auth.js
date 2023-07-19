
//routes '/api/login'

const { Router } = require('express');
const { login, renovarToken } = require('../controllers/authController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



router.post('/',
[
    check('email','el correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],
login
)

router.get('/renovar',
    validarJWT,
    renovarToken
)


module.exports = router;