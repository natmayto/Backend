//api/archivos'


const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { cargarArchivo, returnImage } = require('../controllers/ArchivoController');

const router = Router();

router.use(fileUpload());

router.put( '/:tipo/:id', validarJWT, cargarArchivo );

router.get( '/:tipo/:imagen', returnImage );

module.exports = router;