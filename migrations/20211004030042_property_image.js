
exports.up = function(knex) {
    return knex.schema.createTable('property_image', (table) => {
        table.increments('id').primary();
        table.integer('property_id').references('id').inTable('property');
        table.binary('image_data');
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('property_image');
};
