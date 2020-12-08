const mongoose = require("mongoose")

module.exports = async () => {
    //Create a connection to the database with set options
    await mongoose.createConnection(`${process.env.MONGODB_DATABASE}`, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
    }).then(() => {
        console.log("MongoDB database connected!")
    }).catch((err) => {
        console.log("MongoDB database connection failed.")
        console.log(err)
    })
    mongoose.set('useFindAndModify', false);
    return mongoose
}