const mongoose = require("mongoose")

module.exports = async () => {
    //Create a connection to the database with set options
    await mongoose.createConnection(`${process.env.MONGODB_DATABASE}`, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
    }).catch((err) => {
        console.log(err)
    })
    mongoose.set('useFindAndModify', false);
    return mongoose
}