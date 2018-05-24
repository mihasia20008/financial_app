const Bill = require('../models').bill;
const CardBill = require('../models').cardBill;
const CreditBill = require('../models').creditBill;
const DepositBill = require('../models').depositBill;

const billType = require('./billTypes');

const axios = require('axios');

const CONVERT_API_KEY = '73e79fe68d174383976b8b52b3690ccb';

const CURRENCY = [
    'RUB',
    'USD',
    'EUR'
];

function assignBill(bill) {
    return new Promise((resolve, reject) => {
        const { type } = bill;
        const data = {
            id: bill.id,            
            name: bill.name,
            currency: bill.currency,
            type: bill.type,
            value: bill.value,
            accumulate: bill.accumulate,
            consider: bill.consider,
            isArchival: bill.isArchival,
            userId: bill.UserId,
            create: bill.createdAt,
            update: bill.updatedAt
        };
        billType.getType(type, bill, data)
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

function convertValue(bill, newValue, body) {
    return new Promise((resolve, reject) => {
        let value = newValue && parseFloat(newValue.replace(/\s+/g, '')) || bill.value;
        let oldCurrency = CURRENCY[bill.currency],
            newCurrency = CURRENCY[body.currency];
        typeof newCurrency === 'undefined' ? 
            reject('Некорректное значение валюты') :
            axios.get(`https://openexchangerates.org/api/latest.json?app_id=${CONVERT_API_KEY}`)
                .then(response => {
                    let oldKoeff = response.data.rates[oldCurrency],
                        newKoeff = response.data.rates[newCurrency];
                    value = (value / oldKoeff * newKoeff).toFixed(2);
                    resolve(bill.update({
                        name: typeof body.name !== 'undefined' ? body.name : bill.name,
                        type: typeof body.type !== 'undefined' ? body.type : bill.type,
                        currency: body.currency,
                        value: value,
                        accumulate: typeof body.accumulate !== 'undefined' ? body.accumulate : bill.accumulate,
                        consider: typeof body.consider !== 'undefined' ? body.consider : bill.consider,
                        isArchival: typeof body.isArchival !== 'undefined' ? body.isArchival : bill.isArchival
                    }));
                })
                .catch(err => reject(err));
    }); 
}

module.exports = {
    create(req, res) {
        const { body } = req;
        Bill
            .create({
                name: body.name,
                currency: body.currency,
                type: body.type,
                value: body.value,
                accumulate: body.accumulate,
                consider: body.consider,
                isArchival: body.isArchival,
                UserId: body.user
            })
            .then(bill => billType.createType(body.type, bill.dataValues, body))
            .then(bill => res.status(201).send(bill))
            .catch(err => res.status(400).send(err.toString()));
    },
    delete(req, res) {
        const { body } = req;
        Bill.findById(req.query.id)
            .then(bill => bill.destroy())
            .then(() => res.status(202).send({}))
            .catch(err => res.status(400).send(err.toString()));
    },
    update(req, res) {
        const { body } = req;
        Bill.findById(req.query.id)
            .then(async bill => {
                const { type } = bill;
                let updateBill = (body.convert) ?
                    await convertValue(bill, body.value, body) :
                    await bill.update({
                        name: typeof body.name !== 'undefined' ? body.name : bill.name,
                        type: typeof body.type !== 'undefined' ? body.type : bill.type,
                        currency: typeof body.currency !== 'undefined' ? body.currency : bill.currency,
                        value: typeof body.value !== 'undefined' ? parseFloat(body.value.replace(/\s+/g, '')) : bill.value,
                        accumulate: typeof body.accumulate !== 'undefined' ? body.accumulate : bill.accumulate,
                        consider: typeof body.consider !== 'undefined' ? body.consider : bill.consider,
                        isArchival: typeof body.isArchival !== 'undefined' ? body.isArchival : bill.isArchival
                    });
                return { type, bill: updateBill};
            })
            .then(result => billType.updateType(result.type, result.bill.dataValues, body))
            .then(bill => res.status(202).send(bill))
            .catch(err => res.status(400).send(err.toString()));
    },
    showAll(req, res) {
        Bill.findAll({
            include: [
                { model: CardBill },
                { model: CreditBill },
                { model: DepositBill }
            ],
            where: {
                UserId: req.query.id
            }
        })
            .then(async bills => {
                let items = [];
                for (let bill of bills) {
                    const item = await assignBill(bill);
                    items.push(item);
                }
                return items;
            }) 
            // .then(bills => bills.sort((a, b) => a.id - b.id))
            .then(bills => res.status(200).send(bills))
            .catch(err => res.status(400).send(err.toString()));         
    },
    showOne(req, res) {
        Bill.findOne({
            include: [
                { model: CardBill },
                { model: CreditBill },
                { model: DepositBill }
            ],
            where: {
                id: req.params.id
            }
        })
            .then(bill => assignBill(bill))
            .then(bill => res.status(200).send(bill))
            .catch(err => res.status(400).send(err.toString()));
    },

    changeBalance(id, value) {
        return new Promise((resolve, reject) => {
            Bill.findById(id)
                .then(bill => {
                    if (bill.value + value >= 0) return bill;
                    else if (bill.type !== 1) reject('Недостаточно средств для совершения операции');
                    else return new Promise((resolve, reject) => {
                        CardBill.findOne({
                            where: {
                                BillId: bill.id
                            }
                        })
                            .then(cardBill => cardBill.limit < Math.abs(bill.value + value) ? 
                                reject('Превышение лимита счета при совершении операции') :
                                resolve(bill))
                            .catch(err => reject(err));
                    })
                })
                .then(bill => bill.update({
                    value: bill.value + value
                }))
                .then(bill => resolve(bill))
                .catch(err => reject(err));
        });
    }
};
