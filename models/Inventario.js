const {Schema, model } = require('mongoose');

const InventarioSchema = Schema({
  
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    cantidad: {
        type: Number,
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
    }
 });


InventarioSchema.method('toJSON', function(){
   const { __v, ...object } = this.toObject(); 
   return object;
})


module.exports = model( 'Inventario', InventarioSchema );