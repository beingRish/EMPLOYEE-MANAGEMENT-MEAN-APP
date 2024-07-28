const mongoose = require('mongoose');

const connectToDatabasee = async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/meanDB');
        console.log('Database Connection Successful');
    }
    catch(err) {
        console.log("Error in this.Connection " + err);
    }
}

connectToDatabasee();

module.exports = mongoose;