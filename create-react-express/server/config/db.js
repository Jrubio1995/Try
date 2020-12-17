const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected To Database')
    } catch (error) {
        // if any error
        console.log(error);

    }
}

module.exports = connectDB;