const knex = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SignUp API

signup = (req, res) => {
  const bodydata = req.body;
  const {name,email,password} = req.body
  console.log(name,email,password);
  if (Object.keys(bodydata).length == 0) {
    return res.send({ status: "error", message: "body data empty..." });
  }
  bodydata.password = bcrypt.hashSync(bodydata.password, 10);
  knex("users")
    .insert(bodydata)
    .then((data) => {
      bodydata["id"] = data[0];
      res.send({
        status: "success",
        message: "signup successfully...",
        user: bodydata,
      });
    })
    .catch((err) => {
      if (err.errno == 1062) {
        res.send({ status: "error", message: "This Email already exists." });
      } else if (err.errno == 1048) {
        res.send({ status: "error", message: err.sqlMessage });
      } else if (err.errno == 1364) {
        res.send({ status: "error", message: err.sqlMessage });
      } else {
        res.send(err.message);
      }
    });
};

// Login API

login = (req, res) => {
  let bodydata = req.body;
  if (Object.keys(bodydata).length == 0) {
    return res.send({ status: "error", message: "body data empty..." });
  }
  let { email, password } = req.body;
  knex("users")
    .where({ email: email })
    .then((data) => {
      if (data.length != 0) {
        if (bcrypt.compareSync(password, data[0].password)) {
          const token = jwt.sign({ id: data[0].id }, "iamsecret");
          res.cookie("JWT_TOKEN", token);
          console.log(token);
          res.send({
            status: "success",
            message: "Login Successfully...",
            user: data[0],
            token: token,
          });
        } else {
          res.send({ status: "error", message: "Invalid Email/Password!" });
        }
      } else {
        res.send({ status: "error", message: "Invalid Email Address." });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.send({ status: err.message });
    });
};

// LogOut API

logout = (req, res) => {
  res.clearCookie("JWT_TOKEN").status(200).send("logged out successfully");
};

module.exports = { signup, login, logout };
