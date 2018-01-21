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
    delete(req, res) {
        return Bill.findById(req.params.id)
        .then(bill => bill.destroy())
        .then(() => res.status(202).send({message: "Счет успешно удален."}))
        .catch(err => res.status(400).send(err));
    },
    update(req, res) {
        return Bill.findById(req.params.id)
        .then(bill => bill.update({
            name: req.body.name,
            type: req.body.type,
            value: parseFloat(req.body.value.replace(/\s+/g, '')),
            accumulate: req.body.accumulate === 'true',
            currency: req.body.currency,
        }))
        .then(() => res.status(204).send({message: "Счет успешно обновлен."}))
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
