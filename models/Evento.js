const {Schema, model } = require('mongoose');

const EventoSchema = Schema({
  
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    articulo: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Articulo',
    }
});


EventoSchema.method('toJSON', function(){
   const { __v, ...object } = this.toObject(); 
   return object;
})


module.exports = model( 'Evento', EventoSchema );