const Category = require('../models').category;
const { Op } = require('Sequelize');


module.exports = {
    create(req, res) {
        const { name, icon, color, cost, income, surely, user } = req.body;
        return Category
            .create({
                name, icon, color, cost, income, surely,
                UserId: user
            })
            .then(catygory => res.status(201).send(catygory))
            .catch(err => res.status(400).send(err));
    },
    delete(req, res) {
        return Category.findById(req.query.id)
            .then(category => category.destroy())
            .then(() => res.status(202).send({message: "Категория успешно удалена."}))
            .catch(err => res.status(400).send(err));
    },
    update(req, res) {
        const { id, name, icon, color, cost, income, surely } = req.body;
        return Category.findById(id)
            .then(category => category.update({
                name, icon, color, cost, income, surely
            }))
            .then(() => res.status(202).send({message: "Категория успешно обновлена."}))
            .catch(err => res.status(400).send(err));
    },
    showAll(req, res) {
        return Category.findAll({
            where: {
                UserId: {
                    [Op.or]: [req.query.id, 1]
                }
            }
        })
            .then(categories => res.status(200).send(categories))
            .catch(err => res.status(400).send(err));
    },
    showOne(req, res) {
        return Category.findById(req.params.id)
            .then(category => res.status(200).send(category))
            .catch(err => res.status(400).send(err));
    }
};
