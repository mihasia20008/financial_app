const InOperation = require('../models').inOperation;
const OutOperation = require('../models').outOperation;
const TransOperation = require('../models').transOperation;
const DebtOperation = require('../models').debtOperation;

const findOneCategory = require('./categories').findOneCategory;

module.exports = {
    createType(type, operation, data) {
        return new Promise((resolve, reject) => {
            switch (type) {
                case '0':
                    InOperation.create({
                        origin: data.origin,
                        CategoryId: data.category,
                        OperationId: operation.id
                    })
                        .then(inOperation => resolve(Object.assign(
                            {},
                            operation, 
                            {
                                childId: inOperation.id,
                                categoryId: inOperation.CategoryId,
                                origin: inOperation.origin,
                            }
                        )))
                        .catch(err => reject(err)); 
                    break;
                case '1':
                    OutOperation.create({
                        place: data.place,
                        CategoryId: data.category,
                        OperationId: operation.id
                    })
                        .then(outOperation => resolve(Object.assign(
                            {},
                            operation, 
                            {
                                childId: outOperation.id,
                                categoryId: outOperation.categoryId,
                                place: outOperation.place,
                            }
                        )))
                        .catch(err => reject(err)); 
                    break;
                case '2':
                    TransOperation.create({
                        addressee: data.addressee,
                        OperationId: operation.id
                    })
                        .then(transOperation => resolve(Object.assign(
                            {},
                            operation, 
                            {
                                childId: transOperation.id,
                                addressee: transOperation.addressee,
                            }
                        )))
                        .catch(err => reject(err)); 
                    break;
                case '3':
                    DebtOperation.create({
                        isOut: data.isOut,
                        OperationId: operation.id
                    })
                        .then(debtOperation => resolve(Object.assign(
                            {},
                            operation, 
                            {
                                childId: debtOperation.id,
                                isOut: debtOperation.isOut,
                            }
                        )))
                       .catch(err => reject(err)); 
                    break;
                default:
                    break;
            }
        });
    },
    getType(type, operation) {
        return new Promise(resolve => {
            switch (type) {
                case 0:
                    findOneCategory(operation.InOperations[0].CategoryId)
                        .then(category => resolve(Object.assign(
                            {},
                            {
                                childId: operation.InOperations[0].id,
                                origin: operation.InOperations[0].origin,
                                category: {
                                    name: category.name, 
                                    icon: category.icon, 
                                    color: category.color, 
                                    cost: category.cost, 
                                    income: category.income, 
                                    surely: category.surely,
                                }
                            }
                        )));
                    break;
                case 1:
                    findOneCategory(operation.OutOperations[0].CategoryId)
                        .then(category => resolve(Object.assign(
                            {},
                            {
                                childId: operation.OutOperations[0].id,
                                place: operation.OutOperations[0].place,
                                category: {
                                    name: category.name, 
                                    icon: category.icon, 
                                    color: category.color, 
                                    cost: category.cost, 
                                    income: category.income, 
                                    surely: category.surely,
                                }
                            }
                        )));
                    break;
                case 2:
                    resolve(Object.assign(
                        {},
                        {
                            childId: operation.TransOperations[0].id,
                            addressee: operation.TransOperations[0].addressee
                        }
                    ));
                    break;
                case 3:
                    resolve(Object.assign(
                        {},
                        {
                            childId: operation.DebtOperations[0].id,
                            isOut: operation.DebtOperations[0].isOut
                        }
                    ));
                    break;
                default:
                    resolve({});
            }
        });
    }
};
