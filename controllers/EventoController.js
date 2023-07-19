const { response } = require('express');
const Evento = require('../models/Evento');

// obtener Evento
const getEvento = async (req, res = response) => {

    const eventos = await Evento.find()
                                .populate('usuario','nombre img')
                                .populate('articulo','producto img');

    res.json({
        ok: true,
        eventos
    })

}

// obtener Evento por id
const getEventoId = async (req, res = response) => {

    const id = req.params.id;

    try {
        const evento = await Evento.findById(id)
                                .populate('usuario','nombre img')
                                .populate('articulo','producto img');

    res.json({
        ok: true,
        evento
    })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}


// crear Evento
const crearEvento = async (req, res = response) => {

    const uid = req.uid;
    const evento = new Evento({
        usuario: uid,
        ...req.body
    });

    try {

        const eventoDB = await evento.save();

        res.json({
            ok: true,
            evento: eventoDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

    

}

// actualizar Evento
const actualizarEvento = async (req, res = response) => {

   // id del evento
   const id = req.params.id;

   // id del usuario para verificar qué usuario realizó la modificación
   const uid = req.uid

   try {

           const evento = await Evento.findById( id );

           if ( !evento ) {
               return res.status(404).json({
                   ok:true,
                   msg: 'Evento no encontrado por id',
               });
           }

           const cambiosEvento = {
               ...req.body,
               usuario: uid
           }

           const eventoActualizado = await Evento.findByIdAndUpdate ( id, cambiosEvento, { new: true } );


       res.json({
           ok: true,
           evento: eventoActualizado
       });
       
   } catch (error) {

       console.log(error);
       res.status(500).json({
           ok: false,
           msg: 'No se pudo actualizar el evento'
       });
       
   }

}

// borrar Evento
const borrarEvento = async (req, res = response) => {

    // id del evento
   const id = req.params.id;


   try {

           const evento = await Evento.findById( id );

           if ( !evento ) {
               return res.status(404).json({
                   ok:true,
                   msg: 'Evento no encontrado por id',
               });
           }

           await Evento.findByIdAndDelete( id );


       res.json({
           ok: true,
           msg: 'Evento eliminado'
       });
       
   } catch (error) {

       console.log(error);
       res.status(500).json({
           ok: false,
           msg: 'No se pudo eliminar el evento'
       });
       
   }

}


module.exports= {
    getEvento,
    getEventoId,
    crearEvento,
    actualizarEvento,
    borrarEvento
}