const CardBill = require('../models').cardBill;
const CreditBill = require('../models').creditBill;
const DepositBill = require('../models').depositBill;

module.exports = {
    createType(type, bill, data) {
        return new Promise((resolve, reject) => {
            switch (type) {
                case '1':
                    CardBill.create({
                        limit: data.limit,
                        number: data.number,
                        BillId: bill.id
                    })
                        .then(cardBill => resolve(Object.assign(
                            {},
                            bill, 
                            {
                                childId: cardBill.id,
                                limit: cardBill.limit,
                                number: cardBill.number,
                            }
                        )))
                        .catch(err => reject(err)); 
                    break; 
                case '2':
                    CreditBill.create({
                        receiving: data.receiving,
                        rate: data.rate,
                        schedule: data.schedule,
                        term: data.term,
                        BillId: bill.id
                    })
                        .then(creditBill => resolve(Object.assign(
                            {}, 
                            bill, 
                            {
                                childId: creditBill.id,
                                receiving: creditBill.receiving,
                                rate: creditBill.rate,
                                schedule: creditBill.schedule,
                                term: creditBill.term,
                            }
                        )))
                        .catch(err => reject(err)); 
                    break; 
                case '3':
                    DepositBill.create({
                        receiving: data.receiving,
                        rate: data.rate,
                        schedule: data.schedule,
                        term: data.term,
                        BillId: bill.id
                    })
                        .then(depositBill => resolve(Object.assign(
                            {}, 
                            bill, 
                            {
                                childId: depositBill.id,
                                receiving: depositBill.receiving,
                                rate: depositBill.rate,
                                schedule: depositBill.schedule,
                                term: depositBill.term,
                            }
                        )))
                        .catch(err => reject(err)); 
                default:
                    resolve(Object.assign({}, bill));
            }
        });
    },
    updateType(type, parent, data) {
        return new Promise((resolve, reject) => {
            if (type === +data.type) {
                switch (type) {
                    case 1:
                        CardBill.findOne({
                            where: {
                                BillId: parent.id
                            }
                        })
                            .then(cardBill => cardBill.update({
                                limit: data.limit || cardBill.limit,
                                number: data.number || cardBill.number
                            }))
                            .then(cardBill => resolve(Object.assign(
                                {}, 
                                parent, 
                                {
                                    childId: cardBill.id,
                                    limit: cardBill.limit,
                                    number: cardBill.number
                                }
                            )))
                            .catch(err => reject(err)); 
                        break; 
                    case 2:
                        CreditBill.findOne({
                            where: {
                                BillId: parent.id
                            }
                        })
                            .then(creditBill => creditBill.update({
                                receiving: data.receiving || creditBill.receiving,
                                rate: data.rate || creditBill.rate,
                                schedule: data.schedule || creditBill.schedule,
                                term: data.term || creditBill.term
                            }))
                            .then(creditBill => resolve(Object.assign(
                                {}, 
                                parent, 
                                {
                                    childId: creditBill.id,
                                    receiving: creditBill.receiving,
                                    rate: creditBill.rate,
                                    schedule: creditBill.schedule,
                                    term: creditBill.term,
                                }
                            )))
                            .catch(err => reject(err)); 
                        break; 
                    case 3:
                        DepositBill.findOne({
                            where: {
                                BillId: parent.id
                            }
                        })
                            .then(depositBill => depositBill.update({
                                receiving: data.receiving,
                                rate: data.rate,
                                schedule: data.schedule,
                                term: data.term
                            }))
                            .then(depositBill => resolve(Object.assign(
                                {}, 
                                parent, 
                                {
                                    childId: depositBill.id,
                                    receiving: depositBill.receiving,
                                    rate: depositBill.rate,
                                    schedule: depositBill.schedule,
                                    term: depositBill.term,
                                }
                            )))
                            .catch(err => reject(err)); 
                    default:
                        resolve(Object.assign({}, parent));
                }
            } else {
                switch (type) {
                    case 1:
                        CardBill.findOne({
                            where: {
                                BillId: parent.id
                            }
                        })
                            .then(cardBill => cardBill.destroy())
                            .then(() => this.createType(data.type, parent, data))
                            .then(bill => resolve(bill))
                            .catch(err => reject(err)); 
                        break; 
                    case 2:
                        CreditBill.findOne({
                            where: {
                                BillId: parent.id
                            }
                        })
                            .then(creditBill => creditBill.destroy())
                            .then(() => this.createType(data.type, parent, data))
                            .then(bill => resolve(bill))
                            .catch(err => reject(err)); 
                        break; 
                    case 3:
                        DepositBill.findOne({
                            where: {
                                BillId: parent.id
                            }
                        })
                            .then(depositBill => depositBill.destroy())
                            .then(() => this.createType(data.type, parent, data))
                            .then(bill => resolve(bill))
                            .catch(err => reject(err));
                    default:
                        this.createType(data.type, parent, data)
                            .then(bill => resolve(bill))
                            .catch(err => reject(err));
                }
            }
        });
    },
    getType(type, bill, data) {        
        return new Promise(resolve => {
            switch (type) {
                case 1:
                    resolve(Object.assign(
                        {}, 
                        data,
                        {
                            childId: bill.CardBills[0].id,
                            limit: bill.CardBills[0].limit,
                            number: bill.CardBills[0].number
                        }
                    ));
                    break;
                case 2:
                    resolve(Object.assign(
                        {}, 
                        data,
                        {
                            childId: bill.CreditBills[0].id,
                            receiving: bill.CreditBills[0].receiving,
                            rate: bill.CreditBills[0].rate,
                            schedule: bill.CreditBills[0].schedule,
                            term: bill.CreditBills[0].term
                        }
                    ));
                    break;
                case 3:
                    resolve(Object.assign(
                        {}, 
                        data,
                        {
                            childId: bill.DepositBills[0].id,
                            receiving: bill.DepositBills[0].receiving,
                            rate: bill.DepositBills[0].rate,
                            schedule: bill.DepositBills[0].schedule,
                            term: bill.DepositBills[0].term
                        }
                    ));
                    break;
                default:
                    resolve(Object.assign({}, data));
                    break;
            }
        });
    }
};
