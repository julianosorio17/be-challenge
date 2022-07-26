const mongoose = require("mongoose");

/**
 * Modelo propuesto para guardar las transacciones realizadas en la API,
 * sirve para llevar la trazabilidad de las peticiones realizadas y
 * posibles errores en la API.
 */
const TransactionSchema = new mongoose.Schema({
  transaction_date: {
    type: Date,
    default: Date.now,
  },
  operation: {
    required: true,
    type: String,
  },
  operation_code: {
    required: true,
    type: String,
  },
  error_msg: {
    required: false,
    type: String,
  },
  route: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
