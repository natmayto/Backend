const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});



const conectarDB = async () => {
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('BD conectada');  

    } catch (error){
        console.log(error);
        process.exit(1); //detiene la app
    }
}

module.exports = {
    conectarDB
}