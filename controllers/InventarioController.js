const { response } = require('express');
const Inventario = require('../models/Inventario');

// crear inventario
const crearInventario = async (req, res = response) => {
    
    const uid = req.uid;
    const inventario = new Inventario({
        usuario: uid,
    ...req.body 
    });
    

    try {

       const inventarioDB = await inventario.save();
        
    res.json({
        ok: true,
        inventario: inventarioDB
    });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Hable con el administrador'
        })
        
    }
}

//obtener inventario
const obtenerInventario = async (req, res = response) => {

    const inventario = await Inventario.find()
                                      .populate('usuario','nombre img')

res.json({
    ok: true,
    inventario
});
}

//actualizar inventario
 const actualizarInventario = async (req, res = response) => {

    // id del inventario
    const id = req.params.id;

    // id del usuario para verificar qué usuario realizó la modificación
    const uid = req.uid
 
    try {
 
            const inventario = await Inventario.findById( id );
 
            if ( !inventario ) {
                return res.status(404).json({
                    ok:true,
                    msg: 'Fila de inventario no encontrada por id',
                });
            }
 
            const cambiosInventario = {
                ...req.body,
                usuario: uid
            }
 
            const inventarioActualizado = await Inventario.findByIdAndUpdate ( id, cambiosInventario, { new: true } );
 
 
        res.json({
            ok: true,
            inventario: inventarioActualizado
        });
        
    } catch (error) {
 
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo actualizar el inventario'
        });
        
    }
  
}

//obtener inventario por id
 const obtenerInventarioID = async (req, res = response) => {

    try{

         let inventario = await Inventario.findById(req.params.id);

        if(!inventario){
            res.status(404).json({ msg: 'No existe el producto' })
        }

        res.json(inventario);

    } catch (error){
        console.log(error);
        res.status(500).send('Error al obtener datos');
    }
}

//eliminar inventario
 const eliminarInventario = async (req, res = response) => {

   // id del inventario
   const id = req.params.id;


   try {

           const inventario = await Inventario.findById( id );

           if ( !inventario ) {
               return res.status(404).json({
                   ok:true,
                   msg: 'Fila de inventario no encontrada por id',
               });
           }

           await Inventario.findByIdAndDelete ( id );

       res.json({
           ok: true,
           msg: 'Fila del inventario eliminada'
       });
       
   } catch (error) {

       console.log(error);
       res.status(500).json({
           ok: false,
           msg: 'No se pudo eliminar la fila del inventario'
       });
       
   }
    
}


module.exports={
    crearInventario,
    obtenerInventario,
    obtenerInventarioID,
    actualizarInventario,
    eliminarInventario
}
