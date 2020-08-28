const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Currency = new Schema({
    currencyList: {
        type: {}
    }
},{
    collection: 'Currency'
});

module.exports = mongoose.model('Currency', Currency);

