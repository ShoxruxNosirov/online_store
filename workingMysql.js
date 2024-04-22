const knex_connect = require('./knexfile');
const knex = require('knex');

let db;

module.exports = {

    connectToDb: function () {
        db = knex(knex_connect); // connection.connect();
    },

    connectToDbEnd: async function () {
        db.destroy();         // connection.end();
    },

    getAll: async function (table) {
        return db(table).select('*');
    },

    getById: async function (table, id) {
        return db(table).where({ id });
        return db.select('*').from(table).where({id});
    },

    deleteData: async function (table, objData) {
        return db(table)
            .where({id: objData.id})
            .del();
    },

    updateData: async function (table, dataObj) {
        return db(table)
            .where({ id: dataObj.id })
            .update(dataObj);
    },

    addToDb: async function (table, dataObj) {
        return db(table)
            .insert(dataObj);
    }
}