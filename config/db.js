const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        //! To Suppress Deprecation Warning
        mongoose.set('strictQuery', false);
        
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`Database connected: ${conn.connection.host}`);

    } catch (err) {
        console.log(err);
        process.exit(1);
    }

}

module.exports = connectDB;