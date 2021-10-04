
exports.up = function(knex) {
    return knex.schema.createTable('access_token', (table) => {
        table.increments('id').primary();
        table.string('access_token');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('access_token');
};
