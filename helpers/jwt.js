const jwt = require('jsonwebtoken');




const generarJWT = (uid) => {

        return new Promise( (resolve, reject) => {

            const payload = {
                uid
            };
        
            jwt.sign( payload, process.env.JWT_SECRETO, {
                expiresIn:'100h'
            }, ( err, token ) => {
        
                if ( err ){
                    console.log(err);
                    reject('No se puede generar el JWT');
                } else {
                    resolve ( token );
                }
            });


        });

}


module.exports = {
    generarJWT,
}