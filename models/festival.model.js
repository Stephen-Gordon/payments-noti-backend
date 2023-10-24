const { Schema, model } = require('mongoose')

/////////////////////
/* Festival Model */
///////////////////

const festivalSchema = new Schema({
    title: {
        type: 'string',
        required: [true, 'Title is required']
    },
    description: {
        type: 'string',
        required: [true, 'Description is required']
    },
    city: {
        type: 'string',
        required: [true, 'City is required']
    },
    start_date: {
        type: 'Date',
        required: [true, 'Start date is required']
    },
    end_date: {
        type: 'Date',
        required: [true, 'end date is required']
    },
    image_path: {
        type: 'String',
    },


    
}, { timestamps: true });

module.exports = model('Festival', festivalSchema);