const mongoose = require('mongoose');

const mongoConn = async () => {
    try
    {
        await mongoose.connect( process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('Conexion Mongo OK!');
    }catch(e){
        console.log('Error de Conexion Mongo ', e);
        throw new Error('Error de Conexion');
    }
};

module.exports = {mongoConn};