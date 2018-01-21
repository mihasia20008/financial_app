const Category = require('../models').categories;

module.exports = {
    create(req, res) {
        return Category
        .create({
            name: req.body.name,
            cost: req.body.cost === 'true',
            income: req.body.cost !== 'true',
            UserId: req.body.user
        })
        .then(catygory => res.status(201).send(catygory))
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
