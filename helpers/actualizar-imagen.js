const Usuario = require('../models/Usuario');
const Inventario = require('../models/Inventario');
const Evento = require('../models/Evento');
const Articulo = require('../models/Articulo');

const fs = require('fs');

const eliminarImagen = ( path ) => {
    if (fs.existsSync( path ) ) {
        //borra la imagen anterior
        fs.unlinkSync( path );
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathAntiguo = '';

    switch( tipo ) {
        case 'articulo':
            const articulo = await Articulo.findById(id);

            if( !articulo ){
                console.log('No es un artículo por id');
                return false;
            }
                //si hay un path en la carpeta de imágenes, se elimina para ir sacando información innecesaria
             pathAntiguo = `./archivos/articulo/${ articulo.img }`;
            eliminarImagen( pathAntiguo );

            articulo.img = nombreArchivo;
            await articulo.save();
            return true;

        break;

        case 'evento':
            const evento = await Evento.findById(id);

            if( !evento ){
                console.log('No es un evento por id');
                return false;
            }
                //si hay un path en la carpeta de imágenes, se elimina para ir sacando información innecesaria
             pathAntiguo = `./archivos/evento/${ evento.img }`;
            eliminarImagen( pathAntiguo );

            evento.img = nombreArchivo;
            await evento.save();
            return true;

        break;

        case 'inventario':
            const inventario = await Inventario.findById(id);

            if( !inventario ){
                console.log('No es un inventario por id');
                return false;
            }
                //si hay un path en la carpeta de imágenes, se elimina para ir sacando información innecesaria
             pathAntiguo = `./archivos/inventario/${ inventario.img }`;
            eliminarImagen( pathAntiguo );

            inventario.img = nombreArchivo;
            await inventario.save();
            return true;


        break;

        case 'usuario':
            const usuario = await Usuario.findById(id);

            if( !usuario ){
                console.log('No es un usuario por id');
                return false;
            }
                //si hay un path en la carpeta de imágenes, se elimina para ir sacando información innecesaria
             pathAntiguo = `./archivos/usuario/${ usuario.img }`;
            eliminarImagen ( pathAntiguo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        break;
    }


}

module.exports = {
    actualizarImagen
}