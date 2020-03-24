
exports.up = function(knex) {
    return knex.schema.createTable('Incidents', table => {
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value');

        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('Ongs');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('Incidents');
};
