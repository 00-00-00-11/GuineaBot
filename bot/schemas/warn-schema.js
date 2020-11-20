const mongoose = require('mongoose')

//This is what warn commands use to store data, each object is what is written to the database
const warnSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  warnings: {
    type: [Object],
    required: true,
  },
})

module.exports = mongoose.model('warnings', warnSchema)