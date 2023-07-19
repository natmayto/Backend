const {Schema, model } = require('mongoose');

const ArticuloSchema = Schema({
  
    producto: {
        type: String,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    }
});


ArticuloSchema.method('toJSON', function(){
   const { __v, ...object } = this.toObject(); 
   return object;
})


module.exports = model( 'Articulo', ArticuloSchema );