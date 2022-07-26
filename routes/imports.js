/**
 * Archivo para manejar los imports para el routes file.
 * Permite centralizar todos los imports usados y tener un codigo
 * mas ordenado y limpio.
 */

const express = require("express");

const router = express.Router();

const transactionModel = require("../model/transactionModel");

const UserModel = require("../model/userModel");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const request = require("request");
const transaction = require("../middleware/transactions");

module.exports = {
  request,
  transaction,
  express,
  router,
  UserModel,
  bcrypt,
  jwt,
  auth,
};
