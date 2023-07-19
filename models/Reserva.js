const {Schema, model } = require('mongoose');

const ReservaSchema = Schema({
  
    nombre: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    descripcion: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});


ReservaSchema.method('toJSON', function(){
   const { __v, ...object } = this.toObject(); 
   return object;
})


module.exports = model( 'Reserva', ReservaSchema );