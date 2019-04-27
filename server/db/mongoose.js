const mongoose = require('mongoose')

// connect to our database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/BurgersGoAPI', { useNewUrlParser: true })

module.exports = { mongoose }