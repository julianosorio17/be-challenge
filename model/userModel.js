const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var uniqueValidator = require("mongoose-unique-validator");

/***
 * User model que representa el modelo de usuario para la coleccion en MongoDB
 */

const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
});

/**
 * Convierte el model de usuario en un objeto JSON y remoeve el password
 * @returns
 */
UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

/**
 * Funcion ejecutada antes de guardar el usuario en base de datos para encriptar 
 * la contrasena ingresada por el usuario.
 */
UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

module.exports = mongoose.model("Users", UserSchema);
