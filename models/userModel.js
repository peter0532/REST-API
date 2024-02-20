const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      require: true
    },
    role: {
      type: String,
      enum: ['Admin', 'User'], default: 'User'
    }
  },
  {
timestamps: true
  })


const user = mongoose.model('User', userSchema)