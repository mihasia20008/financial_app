const Operation = require('../models').operation;
const InOperation = require('../models').inOperation;
const OutOperation = require('../models').outOperation;
const TransOperation = require('../models').transOperation;
const DebtOperation = require('../models').debtOperation;

const findOneCategory = require('./categories').findOneCategory;
const changeBalance = require('./bills').changeBalance;

const operationType = require('./operationTypes');

function assignOperation(operation) {
    return new Promise(resolve => operationType.getType(operation.type, operation)
        .then(child => resolve(Object.assign(
            {},
            {
                id: operation.id,
                amount: operation.amount,
                date: operation.date,
                comment: operation.comment,
                retry: operation.retry,
                type: operation.type,
                userId: operation.UserId,
                billId: operation.BillId,
                create: operation.createdAt,
                update: operation.updatedAt
            },
            child
        ))));
}

function updateBill(operation, revert = false) {
    return new Promise((resolve, reject) => {
        const { type, BillId } = operation;
        let amount = type === 0 ? operation.amount : -operation.amount;
        amount = revert ? -amount : amount;
        changeBalance(BillId, amount)
            .then(bill => resolve(
                revert ? operation : Object.assign({}, { operation, bill })
            ))
            .catch(err => reject(err));
    })
}

module.exports = { 
    create(req, res) {
        const { body } = req;
        Operation
            .create({
                amount: body.amount,
                date: body.date,
                comment: body.comment,
                retry: body.retry,
                type: body.type,
                UserId: body.user,
                BillId: body.bill
            })
            .then(operation => operationType.createType(body.type, operation.dataValues, body))
            .then(operation => updateBill(operation))
            .then(operation => res.status(201).send(operation))
            .catch(err => res.status(400).send(err.toString()));
    },
    delete(req, res) {
        Operation.findById(req.query.id)
            .then(operation => updateBill(operation, true))
            .then(operation => operation.destroy())
            .then(() => res.status(202).send({}))
            .catch(err => res.status(400).send(err.toString()));
    },
    showAll(req, res) {
        Operation.findAll({
            include: [
                { model: InOperation },
                { model: OutOperation },
                { model: TransOperation },
                { model: DebtOperation }
            ],
            where: {
                UserId: req.query.id
            }
        })
            .then(async operations => {
                let items = [];
                for (let operation of operations) {
                    items.push(await assignOperation(operation));
                }
                return items;
            })  
            // .then(operations => operations.sort((a, b) => a.id - b.id))
            .then(operations => res.status(200).send(operations))
            .catch(err => res.status(400).send(err.toString()));         
    },
    showOne(req, res) {
        Operation.findOne({
            include: [
                { model: InOperation },
                { model: OutOperation },
                { model: TransOperation },
                { model: DebtOperation }
            ],
            where: {
                id: req.params.id
            }
        })
            .then(operation => !operation ? res.status(404).send() : operation)
            .then(operation => assignOperation(operation))
            .then(operation => res.status(200).send(operation))
            .catch(err => res.status(400).send(err.toString()));
    }
};
