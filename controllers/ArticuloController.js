const { response } = require('express');
const Articulo = require('../models/Articulo');


// obtener articulo
const getArticulo = async (req, res = response) => {

    const articulos = await Articulo.find()
                               .populate('usuario','nombre img')

    res.json({
        ok: true,
        articulos
    })

}

// crear articulo
const crearArticulo = async (req, res = response) => {

    const uid = req.uid;
    const articulo = new Articulo({
        usuario: uid,
    ...req.body 
    });
    

    try {

       const articuloDB = await articulo.save();
        
    res.json({
        ok: true,
        articulo: articuloDB
    });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Hable con el administrador'
        })
        
    }

}

// actualizar articulo
const actualizarArticulo = async (req, res = response) => {

    // id del articulo
    const id = req.params.id;

    // id del usuario para verificar qué usuario realizó la modificación
    const uid = req.uid

    try {

            const articulo = await Articulo.findById( id );

            if ( !articulo ) {
                return res.status(404).json({
                    ok:true,
                    msg: 'Artículo no encontrado por id',
                });
            }

            const cambiosArticulo = {
                ...req.body,
                usuario: uid
            }

            const articuloActualizado = await Articulo.findByIdAndUpdate ( id, cambiosArticulo, { new: true } );


        res.json({
            ok: true,
            articulo: articuloActualizado
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo actualizar el artículo'
        });
        
    }


}

// borrar articulo
const borrarArticulo = async (req, res = response) => {

   // id del articulo
   const id = req.params.id;


   try {

           const articulo = await Articulo.findById( id );

           if ( !articulo ) {
               return res.status(404).json({
                   ok:true,
                   msg: 'Artículo no encontrado por id',
               });
           }

           await Articulo.findByIdAndDelete( id );


       res.json({
           ok: true,
           msg: 'Artículo eliminado'
       });
       
   } catch (error) {

       console.log(error);
       res.status(500).json({
           ok: false,
           msg: 'No se pudo eliminar el artículo'
       });
       
   }


}


module.exports= {
    getArticulo,
    crearArticulo,
    actualizarArticulo,
    borrarArticulo
}