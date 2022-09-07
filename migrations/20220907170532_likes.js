
exports.up = function(knex) {
    return knex.schema
      .createTable("likes", function (table) {
        table.increments("id");
        table.integer("user_id").notNullable();
        table.integer("post_id").notNullable();
        table.boolean("like");
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable("posts")

};
