const knex = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

signup = (req, res) => {
  const bodydata = req.body;
  bodydata.password = bcrypt.hashSync(bodydata.password, 10);
  console.log(bodydata);
  knex("users")
    .insert(bodydata)
    .then((data) => {
      bodydata["id"] = data[0];
      res.send({ status: "signup successfully...", user: bodydata });
    })
    .catch((err) => {
      if (err.errno == 1062) {
        res.send({ status: "error", message: "This Email already exists." });
      } else if (err.errno == 1048) {
        res.send({ status: "error", message: err.sqlMessage });
      } else if (err.errno == 1364) {
        res.send({ status: "error", message: err.sqlMessage });
      } else {
        res.send(err);
      }
    });
};

login = (req, res) => {
  knex("users")
    .where({ email: req.body.email })
    .then((data) => {
      if (data.length != 0) {
        if (bcrypt.compareSync(req.body.password, data[0].password)) {
          const token = jwt.sign({ id: data[0].id }, "iamsecret");
          res.cookie("JWT_TOKEN", token);
          res.send({
            status: "login successfully...",
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
      res.send({ status: err });
    });
};

logout = (req, res) => {
  res.clearCookie("JWT_TOKEN").status(200).send("logged out successfully");
};

module.exports = { signup, login, logout };
