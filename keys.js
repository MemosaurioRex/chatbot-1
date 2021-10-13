require ('dotenv').config();
module.exports={
    mongodb:{
        URI:`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cliente.zkx1t.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
    }
};



