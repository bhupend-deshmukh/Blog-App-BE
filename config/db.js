const db_conection = require("../knexfile")["development"]
const knex = require('knex')(db_conection)


// const knex = require("knex")({
//   client: "mysql",
//   connection: {
//     host: "localhost",
//     user: "root",
//     password: "Bhupendra@123",
//     database: "",
//   },
// });

// knex.schema.hasTable("users").then(function (exists) {
//   if (!exists) {
//     return knex.schema
//       .createTable("users", function (table) {
//         table.increments("id");
//         table.string("first_name").notNullable();
//         table.string("last_name").notNullable();
//         table.string("email").unique().notNullable();
//         table.string("password").notNullable();
//       })
//       .then((data) => {
//         console.log("table created.....");
//       })
//       .catch((err) => {
//         console.log("error while creating table.", err);
//       });
//   }
// });

// knex.schema.hasTable("posts").then(function (exists) {
//   if (!exists) {
//     return knex.schema
//       .createTable("posts", function (table) {
//         table.increments("id");
//         table.string("title").notNullable();
//         table.text("description").notNullable();
//         table.integer("user_id").notNullable();
//         table.dateTime("created_at").defaultTo(knex.fn.now());
//       })
//       .then((data) => {
//         console.log("table created.....");
//       })
//       .catch((err) => {
//         console.log("error while creating table.", err);
//       });
//   }
// });

// knex.schema.hasTable("likes").then(function (exists) {
//   if (!exists) {
//     return knex.schema
//       .createTable("likes", function (table) {
//         table.increments("id");
//         table.integer("user_id").notNullable();
//         table.integer("post_id").notNullable();
//         table.boolean("like");
//       })
//       .then((data) => {
//         console.log("table created.....");
//       })
//       .catch((err) => {
//         console.log("error while creating table.", err);
//       });
//   }
// });

module.exports = knex;