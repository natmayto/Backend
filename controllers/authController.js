const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const login = async(req, res = response ) =>{

    const { email, password } = req.body;

    try {
        // verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo o contraseña no válida'
            });
        }
        //verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: ' Correo o constraseña no válida'
            });
        }

        //generar el token = JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const renovarToken = async (req, res = response) => {

  const uid = req.uid;

    const token = await generarJWT ( uid );
    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        token,
        usuario
    });
}

module.exports = {
    login,
    renovarToken
}