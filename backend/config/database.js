const mongoose = require('mongoose');

const databaseConnect=()=>{
    mongoose.connect(process.env.BATABASE_URL,{
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