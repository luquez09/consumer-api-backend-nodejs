const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config({ path: 'variables.env' });
const mongoose = require('mongoose');

const conectionDataBase = async() => {
    try {
        await mongoose.connect(process.env.DB_MONGO);
        console.log("DB Connection, successful");
    } catch (error) {
        console.log("Error connection to Database: " + error );
        process.exit(1);
    }
}

module.exports = conectionDataBase;