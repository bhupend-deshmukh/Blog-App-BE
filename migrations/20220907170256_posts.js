exports.up = function(knex) {
    return knex.schema.createTable("posts", function (table) {
        table.increments("id");
        table.string("title").notNullable();
        table.text("description").notNullable();
        table.integer("user_id").notNullable();
        table.dateTime("created_at").defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("posts")
};