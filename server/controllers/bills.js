const Bill = require('../models').bill;
const CardBill = require('../models').cardBill;
const CashBill = require('../models').cashBill;
const CreditBill = require('../models').creditBill;
const DepositBill = require('../models').depositBill;

function createType(type, id, data) {
    switch (type) {
        case 0:
            return CashBill.create({
                value: data.value,
                accumulate: !!data.accumulate,
                BillId: id
            });
        case 1:
            return CardBill.create({
                value: data.value,
                accumulate: !!data.accumulate,
                number: data.number,
                BillId: id
            }); 
        case 2:
            return CreditBill.create({
                amount: data.amount,
                rate: data.rate,
                term: data.term,
                schedule: data.schedule,
                BillId: id
            }); 
        case 3:
            return DepositBill.create({
                amount: data.amount,
                type: data.type,
                rate: data.rate,
                term: data.term,
                date: data.date,
                BillId: id
            });
        default:
            break;
    }
}

function combineData(bill) {
    return Object.assign(
        {},
        {
            id: bill.id,
            name: bill.name,
            currency: bill.currency,
            userId: bill.UserId,
            cardBills: bill.CardBills.map(cardBill => Object.assign(
                {},
                {
                    id: cardBill.id,
                    value: cardBill.value,
                    number: cardBill.number
                }
            )),
            cashBills: bill.CashBills.map(cashBill => Object.assign(
                {},
                {
                    id: cashBill.id,
                    value: cashBill.value,
                    accumulate: cashBill.accumulate
                }
            )),
            creditBills: bill.CreditBills.map(creditBill => Object.assign(
                {},
                {
                    id: creditBill.id,
                    amount: creditBill.amount,
                    term: creditBill.term
                }
            )),
            depositBills: bill.DepositBills.map(depositBill => Object.assign(
                {},
                {
                    id: depositBill.id,
                    amount: depositBill.amount,
                    term: depositBill.term
                }
            ))
        }
    );
}

module.exports = {
    create(req, res) {
        const { body } = req;
        console.log(body);
        return Bill
            .create({
                name: body.name,
                currency: body.currency,
                UserId: body.user
            })
            .then(bill => createType(body.type, bill.id, body)
                .then(child => res.status(201).send({bill, child}))
                .catch(err => res.status(400).send(err))
            )
            .catch(err => res.status(400).send(err));
    },
    delete(req, res) {
        return Bill.findById(req.query.id)
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
    showAll(req, res) {
        return Bill.findAll({
            include: [
                { model: CardBill },
                { model: CashBill },
                { model: CreditBill },
                { model: DepositBill }
            ],
            where: {
                UserId: req.query.id
            }
        })
            .then(bills => bills.map(bill => combineData(bill)))  
            .then(bills => res.status(200).send(bills))
            .catch(err => res.status(400).send(err.toString()));         
    },
    showOne(req, res) {
        return Bill.findOne({
            include: [
                { model: CardBill },
                { model: CashBill },
                { model: CreditBill },
                { model: DepositBill }
            ],
            where: {
                id: req.params.id
            }
        })
            .then(bill => combineData(bill))
            .then(bill => res.status(200).send(bill))
            .catch(err => res.status(400).send(err.toString()));
    }
};
