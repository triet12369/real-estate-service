
exports.up = function(knex) {
    return knex.schema.createTable('property', (table) => {
        table.increments('id').primary();
        table.string('title');
        table.string('country');
        table.string('city');
        table.string('address');
        table.string('description');
        table.string('list_type');
        table.decimal('price', 14, 2);
        table.string('price_type');
        table.integer('num_bathroom');
        table.integer('num_bedroom');
        table.string('contacts');
        table.boolean('active');
        table.string('property_type');
        table.integer('year_built');
        table.date('expiration_date');
        table.integer('main_image_id');
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('property');
};
