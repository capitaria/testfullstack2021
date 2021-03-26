const mongoose = require ('mongoose');
const uri = 'mongodb://localhost/api';
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true })
    .then(db => console.log("esta conectada"))
    .catch(err => console.log(err));

module.exports = mongoose;