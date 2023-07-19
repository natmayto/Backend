const { response } = require('express');
const Reserva = require('../models/Reserva');


// obtener Reserva
const getReserva = async (req, res = response) => {

    const reservas = await Reserva.find()
                        .populate('usuario','nombre img')
    

            res.json({
                ok: true,
                reservas
            })

}

// crear Reserva
const crearReserva = async (req, res = response) => {
    const uid = req.uid;
    const reserva = new Reserva({
        usuario: uid,
    ...req.body 
    });
    

    try {

       const reservaDB = await reserva.save();
        
    res.json({
        ok: true,
        reserva: reservaDB
    });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Hable con el administrador'
        })
        
    }
}

// actualizar Reserva
const actualizarReserva = async (req, res = response) => {

      // id de la reserva
      const id = req.params.id;

      // id del usuario para verificar qué usuario realizó la modificación
      const uid = req.uid
   
      try {
   
              const reserva = await Reserva.findById( id );
   
              if ( !reserva ) {
                  return res.status(404).json({
                      ok:true,
                      msg: 'Reserva no encontrada por id',
                  });
              }
   
              const cambiosReserva = {
                  ...req.body,
                  usuario: uid
              }
   
              const reservaActualizada = await Reserva.findByIdAndUpdate ( id, cambiosReserva, { new: true } );
   
   
          res.json({
              ok: true,
              reserva: reservaActualizada
          });
          
      } catch (error) {
   
          console.log(error);
          res.status(500).json({
              ok: false,
              msg: 'No se pudo actualizar la reserva'
          });
          
      }

}

// borrar reserva
const borrarReserva = async (req, res = response) => {

     // id de la reserva
     const id = req.params.id;

  
     try {
  
             const reserva = await Reserva.findById( id );
  
             if ( !reserva ) {
                 return res.status(404).json({
                     ok:true,
                     msg: 'Reserva no encontrada por id',
                 });
             }
  
           await Reserva.findByIdAndDelete( id );
  
         res.json({
             ok: true,
             msg: 'Reserva eliminada'
         });
         
     } catch (error) {
  
         console.log(error);
         res.status(500).json({
             ok: false,
             msg: 'No se pudo eliminar la reserva'
         });
         
     }

}


module.exports= {
    getReserva,
    crearReserva,
    actualizarReserva,
    borrarReserva
}