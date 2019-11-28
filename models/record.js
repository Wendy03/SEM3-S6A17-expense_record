const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  category: {
    type: String,
    require: true
  },
  amount: {
    type: Number,
    required: true
  },
  merchant: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    required: true
  }

})

module.exports = mongoose.model('Record', recordSchema)