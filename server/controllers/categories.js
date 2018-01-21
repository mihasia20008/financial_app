const Category = require('../models').categories;

module.exports = {
    create(req, res) {
        return Category
        .create({
            name: req.body.name,
            cost: req.body.cost,
            income: !req.body.cost,
            UserId: req.body.user
        })
        .then(catygory => res.status(201).send(catygory))
        .catch(err => res.status(400).send(err));
    },
    delete(req, res) {
        return Category.findById(req.params.id)
        .then(category => category.destroy())
        .then(() => res.status(202).send({message: "Категория успешно удалена."}))
        .catch(err => res.status(400).send(err));
    },
    update(req, res) {
        return Category.findById(req.params.id)
        .then(category => category.update({
            name: req.body.name,
            cost: req.body.cost,
            income: !req.body.cost,
        }))
        .then(() => res.status(204).send({message: "Категория успешно обновлена."}))
        .catch(err => res.status(400).send(err));
    },
    show(req, res) {
        return Category.findAll({
            where: {
                UserId: req.params.id
            }
        })
        .then(categories => res.status(200).send(categories))
        .catch(err => res.status(400).send(err));
    }
};
