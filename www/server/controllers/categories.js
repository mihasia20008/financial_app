const Category = require('../models').category;
const Op = require('sequelize').Op;

function findOneCategory(id) {
    return Category.findById(id)
}

function findAllCategories(id) {
    return Category.findAll({
        where: {
            UserId: {
                [Op.or]: [id, 1]
            }
        }
    })
}

module.exports = {
    findOneCategory(id) {
        return Category.findById(id)
    },
    create(req, res) {
        const { name, icon, color, cost, income, surely, user } = req.body;
        Category
            .create({
                name, icon, color, cost, income, surely,
                UserId: user
            })
            .then(catygory => res.status(201).send(catygory))
            .catch(err => res.status(400).send(err));
    },
    delete(req, res) {
        findOneCategory(req.params.id)
            .then(category => category.destroy())
            .then(() => res.status(202).send({}))
            .catch(err => res.status(400).send(err));
    },
    update(req, res) {
        const { id, name, icon, color, cost, income, surely } = req.body;
        findOneCategory(id)
            .then(category => category.update({
                name: name || category.name, 
                icon: icon || category.icon,
                color: color || category.color, 
                cost: cost || category.cost, 
                income: income || category.income,  
                surely: surely || category.surely
            }))
            .then(category => res.status(202).send(category))
            .catch(err => res.status(400).send(err));
    },
    showAll(req, res) {
        findAllCategories(req.query.id)
            .then(categories => res.status(200).send(categories))
            .catch(err => res.status(400).send(err));
    },
    showOne(req, res) {
        findOneCategory(req.params.id)
            .then(category => res.status(200).send(category))
            .catch(err => res.status(400).send(err));
    }
};
