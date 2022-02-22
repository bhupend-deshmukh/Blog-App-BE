const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "Bhupendra@123",
    database: "blog_app",
  },
});

knex.schema.hasTable("users").then(function(exists) {
  if (!exists) {
    return knex.schema
      .createTable("users", function (table) {
        table.increments("id");
        table.string("name").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
      })
      .then((data) => {
        console.log("table created.....");
      })
      .catch((err) => {
        console.log("error while creating table.", err);
      });
  }
});


knex.schema.hasTable("posts").then(function(exists) {
	if (!exists) {
	  return knex.schema
		.createTable("posts", function (table) {
		  table.increments("id");
		  table.string("title").notNullable();
		  table.text("description").notNullable();
		  table.integer("customer_id").notNullable();
		})
		.then((data) => {
		  console.log("table created.....");
		})
		.catch((err) => {
		  console.log("error while creating table.", err);
		});
	}
  });
  
knex.schema.hasTable("like_dislike").then(function(exists) {
	if (!exists) {
		return knex.schema
		.createTable("like_dislike", function (table) {
			
			table.integer("customer_id").notNullable();
			table.integer("post_id").notNullable();
			table.boolean("like");
			table.boolean("dislike");
		})
		.then((data) => {
			console.log("table created.....");
		})
		.catch((err) => {
			console.log("error while creating table.", err);
		});
}
});




module.exports = knex;