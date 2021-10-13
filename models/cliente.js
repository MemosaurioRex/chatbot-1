const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema;

const clienteSchema = new schema({
    correo:String,
    password:String
});

clienteSchema.method({
    encryptPassword: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    },
    comparePassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    }
  })
// crear modelo 
const cliente = mongoose.model('usuarios',clienteSchema);

module.exports = cliente;