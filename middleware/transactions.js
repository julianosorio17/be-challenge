const TransactionModel = require("../model/transactionModel");

/**
 * Funcion para guardar en base de datos las transacciones realizadas en la API.
 * @param {Metodo usado en la peticion} method
 * @param {Codigo retornada en la peticions} statusCode
 * @param {Mensaje de error en caso de obtener alguno} errorMsg
 * @param {Path de la peticion que ejecuto la transaccion.} route
 */
module.exports.log = function (method, statusCode, errorMsg, route) {
  const transaction = new TransactionModel({
    operation: method,
    operation_code: statusCode,
    error_msg: errorMsg,
    route: route,
  });
  transaction.save();
};
