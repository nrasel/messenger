const mongoose = require('mongoose');

const databaseConnect=()=>{
    mongoose.connect('mongodb://localhost:27017/messenger',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log('mongodb database connect...')
    }).catch(error=>{
        console.log(error);
        
    })
}

module.exports = databaseConnect;