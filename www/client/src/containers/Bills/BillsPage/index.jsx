import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import * as formActions from '../../../store/form/actions';

import './style.css';

import BillCard from '../../../components/BillCard';
import BillsForm from '../BillsForm';
import AddBillForm from '../BillsForm/AddBillForm';
import EditBillForm from '../BillsForm/EditBillForm';
import SortBillForm from '../BillsForm/SortBillForm';
import FilterBillForm from '../BillsForm/FilterBillForm';

class BillsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: 'create-down',
            filter: {
                archive: {
                    value: '0',
                    label: 'Показывать архиные счета?',
                    type: 'radio',
                    values: [
                        {
                            value: '0',
                            label: 'Нет'
                        },
                        {
                            value: '1',
                            label: 'Да'
                        },
                    ]
                },
                types: {
                    value: ['0', '1'],
                    label: 'Отображать типы счетов:',
                    type: 'checkbox',
                    values: [
                        {
                            value: '0',
                            label: 'Наличные средства'
                        },
                        {
                            value: '1',
                            label: 'Банковские карты'
                        },
                        {
                            value: '2',
                            label: 'Кредитные счета'
                        },
                        {
                            value: '3',
                            label: 'Депозитные счета'
                        },
                    ]
                },
            }
        };

        this.handleSortSelect = this.handleSortSelect.bind(this);
        this.handleFilterSelect = this.handleFilterSelect.bind(this);
        this.sortBills = this.sortBills.bind(this);
        this.filterBills = this.filterBills.bind(this);
    }
    componentDidMount() {
        const { getDataOnLoad, path } = this.props;

        axios.get(`/api?path=${path}`)
            .then(res => getDataOnLoad(res.data))
            .catch(err => console.error(err));
    }

    handleSortSelect(event, value) {
        this.setState({ sort: value }); 
        this.props.toggleSortForm(event);       
    }

    handleFilterSelect(event, filter) {
        this.setState({ filter }); 
        this.props.toggleFilterForm(event);       
    }

    sortBills() {
        const { bills, billsId } = this.props;
        const { sort } = this.state;
        switch (sort) {
            case 'create-down':
                return billsId.sort((a, b) => {
                    if (bills[a].create < bills[b].create)
                        return -1;
                    if (bills[a].create > bills[b].create)
                        return 1;
                    return 0;
                });
            case 'create-up':
                return billsId.sort((a, b) => {
                    if (bills[a].create > bills[b].create)
                        return -1;
                    if (bills[a].create < bills[b].create)
                        return 1;
                    return 0;
                });
            case 'balance-up':
                return billsId.sort((a, b) => {
                    if (+bills[a].value < +bills[b].value)
                        return -1;
                    if (+bills[a].value > +bills[b].value)
                        return 1;
                    return 0;
                });
            case 'balance-down':
                return billsId.sort((a, b) => {
                    if (+bills[a].value > +bills[b].value)
                        return -1;
                    if (+bills[a].value < +bills[b].value)
                        return 1;
                    return 0;
                });
            case 'abc':
                return billsId.sort((a, b) => {
                    if (bills[a].name < bills[b].name)
                        return -1;
                    if (bills[a].name > bills[b].name)
                        return 1;
                    return 0;
                });
                
            default: 
                return billsId;
        }
    }

    filterBills(id) {
        const { bills } = this.props;
        const { filter } = this.state;

        if (typeof bills[id] === 'undefined')
            return false;
        if (filter.archive.value === '0' && bills[id].isArchival)
            return false;                        
        if (filter.types.value.every(item => +item !== bills[id].type))
            return false;
        return true;
    }

    render() {   
        const { 
            bills, 
            billsId, 
            toggleAddForm, 
            toggleEditForm, 
            toggleSortForm, 
            toggleFilterForm, 
            formShow 
        } = this.props;
        const { sort, filter } = this.state;
        
        return (
            <div className="bills">
                <div className="bills__list">
                    {typeof billsId !== 'undefined' ? 
                        this.sortBills().filter(id => this.filterBills(id)).map((bill, index) => {
                            return (
                                <div key={index} className="bills__list-item">
                                    <BillCard  {...bills[bill]} />
                                </div>
                            );
                        }) : ''}
                    <div className="bills__list-item">
                        <div className="bill bill--add">
                            <a href="/createbill" 
                                className="bill-add" 
                                onClick={event => toggleAddForm(event)}>
                                <svg className="bill-add__icon">
                                    <use xlinkHref="#add-bill-icon" />
                                </svg>
                                Добавить счет
                            </a>
                        </div>
                    </div>
                </div>
                <BillsForm title="Добавить счет" 
                    show={formShow.showAddForm} 
                    toggleForm={event => toggleAddForm(event)}>
                    <AddBillForm isModal={true} />
                </BillsForm>
                <BillsForm title="Изменить счет" 
                    show={formShow.showEditForm} 
                    toggleForm={event => toggleEditForm(event)}>
                    <EditBillForm isModal={true} />
                </BillsForm>
                <BillsForm title="Сортировка" 
                    show={formShow.showSortForm} 
                    toggleForm={event => toggleSortForm(event)}>
                    <SortBillForm isModal={true} 
                        activeSort={sort}
                        onSortSelect={(event, value) => this.handleSortSelect(event, value)} />
                </BillsForm>
                <BillsForm title="Фильтры" 
                    show={formShow.showFilterForm} 
                    toggleForm={event => toggleFilterForm(event)}>
                    <FilterBillForm isModal={true}
                        filters={filter}
                        onFilterSelect={(event, filter) => this.handleFilterSelect(event, filter)} />
                </BillsForm>
                <div className="bills__overlay"></div>
            </div>
        );
    }
}

BillsPage.propTypes = {
    path: PropTypes.string.isRequired,
    getDataOnLoad: PropTypes.func.isRequired,
    userId: PropTypes.number,
    formShow: PropTypes.object,
    bills: PropTypes.object,
    billsId: PropTypes.array,
    toggleAddForm: PropTypes.func.isRequired,
    toggleEditForm: PropTypes.func.isRequired,
    toggleSortForm: PropTypes.func.isRequired,
    toggleFilterForm: PropTypes.func.isRequired,
};

function mapStateToProps(state) {   
    return {
        bills: state.bill.bills,
        billsId: state.bill.billIds,
        formShow: state.form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleAddForm: event => {
            event.preventDefault();
            dispatch(formActions.toggleAddForm());
        },
        toggleEditForm: event => {
            event.preventDefault();
            dispatch(formActions.toggleEditForm());
        },
        toggleSortForm: event => {
            event.preventDefault();
            dispatch(formActions.toggleSortForm());
        },
        toggleFilterForm: event => {
            event.preventDefault();
            dispatch(formActions.toggleFilterForm());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BillsPage);
