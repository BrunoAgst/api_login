const mongoose = require('mongoose');

const URI = process.env.URL_MONGO; 

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log('db connected');
    }).catch(err => {
        console.log(err);
    });
}

module.exports = connectDB;