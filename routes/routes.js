/***
 * Archivo que contiene las rutas expuestas para la API.
 */

const {
  request,
  transaction,
  express,
  router,
  transactionModel,
  UserModel,
  bcrypt,
  jwt,
  auth,
} = require("./imports");

module.exports = router;

/**
 * POST method: permite el registro de un usuario
 */
router.post("/createUser", async (req, res) => {
  const data = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
  });

  try {
    const dataToSave = await data.save();
    transaction.log(req.method, "200", "", "/createUser");
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * GET method: retorna la lista de usuarios creados
 */
router.get("/getAllUsers", auth, async (req, res) => {
  try {
    const data = await Model.find();
    transaction.log(req.method, "200", "", "/getAllUser");
    res.json(data);
  } catch (error) {
    transaction.log(req.method, "500", error.message, "/getAllUser");
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET method: retorna un solo usuario por el ID enviado como parametro.
 */
router.get("/getOneUserById/:id", auth, async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    transaction.log(req.method, "200", "", "/getOneUserById");
    res.json(data);
  } catch (error) {
    transaction.log(req.method, "500", error.message, "/getOneUserById");
    res.status(500).json({ message: error.message });
  }
});

/**
 * POST method: Login de usuario. Valida las credenciales enviada en la peticion y
 * retorna el token para posteriores peticiones donde es requerido.
 */
router.post("/login", async (req, res) => {
  let body = req.body;
  UserModel.findOne({ email: body.email }, (error, userDB) => {
    if (error) {
      transaction.log(req.method, "500", error, "/updateUser");
      return res.status(500).json({
        ok: false,
        error: error,
      });
    }
    // Verifica que exista un usuario con el mail escrita por el usuario.
    if (!userDB) {
      transaction.log(req.method, "400", "User not found.", "/updateUser");
      return res.status(400).json({
        ok: false,
        error: {
          message: "User not found.",
        },
      });
    }
    // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
    if (!bcrypt.compareSync(body.password, userDB.password)) {
      transaction.log(
        req.method,
        "400",
        "User or password is not correct",
        "/updateUser"
      );
      return res.status(400).json({
        ok: false,
        error: {
          message: "User or password is not correct",
        },
      });
    }

    let token = jwt.sign(
      {
        user: userDB,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: process.env.TOKEN_EXPIRE,
      }
    );
    transaction.log(req.method, "200", "", "/login");
    res.json({
      ok: true,
      user: userDB,
      token,
    });
  });
});

/**
 * GET method: Servicio para limpiar el token y cerrar sesion.
 */
router.get("/logout", auth, function (req, res) {
  const authHeader = req.headers["x-access-token"];
  jwt.sign(authHeader, "", { expiresIn: "1s" }, (logout, err) => {
    if (logout) {
      transaction.log(req.method, "200", "", "/logout");
      res.send({ msg: "You have been Logged Out" });
    } else {
      transaction.log(req.method, "500", "Error logging out.", "/logout");
      res.send({ msg: "Error" });
    }
  });
});

/**
 * GET method: Servicio para retornar las locaciones cercanas dadas las coordenada
 * (parametro q) y una ubicacion en texto (parametro at). Para obtener las ubicaciones
 * se esta implementando la API HereAPI
 */
router.get("/getPlaces", auth, function (req, res) {
  const authHeader = req.headers["x-access-token"];
  try {
    let at = req.query.at;
    let q = req.query.q;

    const requestOptions = {
      url: "https://places.ls.hereapi.com/places/v1/autosuggest",
      method: "GET",
      json: {},
      qs: {
        q: q,
        at: at,
        apiKey: process.env.PLACES_API_KEY,
      },
    };
    request(requestOptions, (err, response, body) => {
      if (err) {
        transaction.log(req.method, "500", err, "/getPlaces");
      } else if (response.statusCode === 200) {
        transaction.log(req.method, "200", "", "/getPlaces");
        res.send(body);
      } else {
        transaction.log(
          req.method,
          response.statusCode,
          response.message,
          "/getPlaces"
        );
      }
    });
  } catch (error) {
    transaction.log(req.method, "500", error.message, "/getPlaces");

    res.status(500).json({ message: error.message });
  }
});

/**
 * GET method: retorna las transacciones realizadas en la API
 */
router.get("/getAllTransactions", auth, async (req, res) => {
  try {
    const data = await transactionModel.find();
    transaction.log(req.method, "200", "", "/getAllTransactions");
    res.json(data);
  } catch (error) {
    transaction.log(req.method, "500", error.message, "/getAllUser");
    res.status(500).json({ message: error.message });
  }
});
