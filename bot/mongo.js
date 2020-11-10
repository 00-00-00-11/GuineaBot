const mongoose = require("mongoose")

module.exports = async () => {
    await mongoose.createConnection(`${process.env.MONGODB_DATABASE}`, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
    })
    mongoose.set('useFindAndModify', false);
    return mongoose
}