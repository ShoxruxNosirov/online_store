const workingDb = require('../services/workingDB');

const tableName = 'warehouse';

class warehouseController {

    async getAll(req, res) {
        try {
            const data = await workingDb.getAll(tableName);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: 'Failed to fetch warehouse', error: err })
        }
    };

    async getById(req, res) {
        try {
            const id = req.params.id;
            const data = await workingDb.getById(tableName, id);
            if (data.length) {
                res.status(200).json(data[0]);
            } else {
                res.status(404).json({ message: 'Warehouse not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Failed to fetch warehouse', error: err })
        }
    };

    async create(req, res) {
        try {
            const data = await workingDb.createData(tableName, req.body);
            res.status(201).json({ id: data[0] });
        } catch (err) {
            res.status(500).json({ message: 'Failed to create warehouse', error: err })
        }
    };

    async update(req, res) {
        try {
            const obj = { id: req.params.id };
            Object.assign(obj, req.body);
            const updated = await workingDb.updateData(tableName, obj);
            res.status(200).json({ updated });
        } catch (err) {
            res.status(500).json({ message: 'Failed to update warehouse', error: err });
        }
    }

    async delete(req, res) {
        try {
            const obj = { id: req.params.id };
            Object.assign(obj, req.body);
            const deleted = await workingDb.deleteData(tableName, obj);
            if (deleted) {
                res.status(200).json({ deleted });
            } else {
                res.status(404).json({ message: 'Warehouse not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Failed to delete warehouse', error: err })
        }
    }
}


module.exports = new warehouseController();