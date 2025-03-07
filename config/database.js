const mongoose = require('mongoose');
require('dotenv').config()

const connection = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(`${process.env.DB_HOST}`, options);
        console.log('Connected to Mongo', process.env.DB_HOST);
    }
    catch (error) {
        console.log(process.env.DB_HOST);
        console.log('Failed to connect Mongo', error)
    }
}

module.exports = { connection }