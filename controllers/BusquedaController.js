// get ToDo

const { response } = require('express');
const Usuario = require('../models/Usuario');
const Evento = require('../models/Evento');
const Inventario = require('../models/Inventario');
const Reserva = require('../models/Reserva');
const Articulo = require('../models/Articulo');


const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

   
    const [ usuario, articulo, inventario, evento, reserva ] = await Promise.all([

         Usuario.find({   nombre: regex }),
         Articulo.find({   producto: regex }),
         Inventario.find({   nombre: regex }),
         Evento.find({   nombre: regex }),
         Reserva.find({   nombre: regex }),
 
    ])

    res.json({
        ok:true,
        usuario,
        articulo,
        evento,
        inventario,
        reserva
    })
}

const getDocumentosColeccion = async (req, res = response) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp( busqueda, 'i' );

    let data = [];


    switch (tabla) { 
        case 'usuarios':
                  data = await Usuario.find({   nombre: regex });                                 
           
            break;

            case 'articulos':
                 data = await Articulo.find({   producto: regex })    
                                              .populate('usuario','nombre img');
               
            break;

            case 'inventarios':
                 data = await Inventario.find({   nombre: regex })
                                                 .populate('usuario','nombre img');
            break;

            case 'eventos':
                 data = await Evento.find({   nombre: regex })
                                                    .populate('usuario','nombre img')
                                                    .populate('articulo','producto img');
            break;

            case 'reservas':
                 data = await Reserva.find({   nombre: regex })
                                                   .populate('usuario','nombre img');
               
            break;
    
        default:
           return res.status(400).json({
                ok:false,
                msg: 'La tabla tiene que ser usuarios, articulos, inventarios, eventos o reservas'
            });
    }

    res.json({
        ok:true,
        resultados: data
    })

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}