const Category = require('../models').category;
const Op = require('sequelize').Op;

module.exports = {
    findOneCategory(id) {
        return Category.findById(id)
    },
    findAllCategories(id) {
        return Category.findAll({
            where: {
                UserId: {
                    [Op.or]: [id, 1]
                }
            }
        })
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
        this.findOneCategory(req.params.id)
            .then(category => category.destroy())
            .then(() => res.status(202).send({}))
            .catch(err => res.status(400).send(err));
    },
    update(req, res) {
        const { id, name, icon, color, cost, income, surely } = req.body;
        this.findOneCategory(id)
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
        this.findAllCategories(req.query.id)
            .then(categories => res.status(200).send(categories))
            .catch(err => res.status(400).send(err));
    },
    showOne(req, res) {
        this.findOneCategory(req.params.id)
            .then(category => res.status(200).send(category))
            .catch(err => res.status(400).send(err));
    }
};
