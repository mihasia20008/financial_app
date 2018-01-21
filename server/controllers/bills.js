const Bill = require('../models').bills;

module.exports = {
    create(req, res) {
        return Bill
        .create({
            name: req.body.name,
            type: req.body.type,
            value: parseFloat(req.body.value),
            accumulate: req.body.accumulate === 'true',
            currency: req.body.currency,
            UserId: req.body.user
        })
        .then(bill => res.status(201).send(bill))
        .catch(err => res.status(400).send(err));
    },
    show(req, res) {
        return Bill.findAll({
            where: {
                UserId: req.params.id
            }
        })
        .then(bills => res.status(200).send(bills))
        .catch(err => res.status(400).send(err));
    }
};
