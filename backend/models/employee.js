const mongoose = require('mongoose');

const Employyee = mongoose.model('Employee', {
    name: {type: String},
    designation: {type: String},
    dept: {type: String},
    status: {type: String}
})

module.exports = Employyee;