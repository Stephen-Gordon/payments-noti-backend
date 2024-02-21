const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  
    address: {
        type: String,
    },
    subscription: {
        type: Object,
    },
  
    
}, {timestamps: true});


module.exports = model('User', userSchema);