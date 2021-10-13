const mongoose = require ('mongoose');
const{mongodb} = require('./keys');
mongoose.connect(mongodb.URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log('base de datos conectada'))
.catch(e => console.log(e))
