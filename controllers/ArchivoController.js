const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const cargarArchivo = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    const validos = ['articulo','evento','inventario','usuario'];

    if ( !validos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un artículo, evento, inventario o usuario'
           });
    }

    //validación de archivo existente
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se escogió ningún archivo'
        })
      }

      //procesamiento de imagen
      const archivo = req.files.imagen;

      const cortado = archivo.name.split('.'); //para los nombres cortados de las imágenes
      const extArchivo = cortado [ cortado.length - 1 ];

      //validacion de extensión

      const extPermitidas = ['png','jpg','jpeg','gif'];
      
      if ( !extPermitidas.includes(extArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Solo se permiten archivos con extensiones png, jpg, jpeg y gif'
        });
      }

      //creación del nombre del archivo
      const nombreArchivo = `${ uuidv4() }.${ extArchivo }`;

      //path para guardar imagen
      const path = `./archivos/${ tipo }/${ nombreArchivo }`;


      // mover la imagen
      archivo.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover imagen'
            });
    

        }
          
        //Actualización de base de datos
        actualizarImagen(tipo, id, nombreArchivo);    

        
    res.json({
        ok: true,
        msg: 'Archivo subido',
        nombreArchivo
    });
      });


}

const returnImage = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const imagen = req.params.imagen;

    const pathImage = path.join( __dirname, `../archivos/${ tipo }/${ imagen }` );

    //si en caso tal no se encuentra la imagen, se devuelve una imagen vacía
    if ( fs.existsSync( pathImage ) ) {
        res.sendFile( pathImage );
    } else {
        const pathImage = path.join( __dirname, `../archivos/sin-imagen.jpg` );
        res.sendFile( pathImage );
    }

}

module.exports = {
    cargarArchivo,
    returnImage
}