import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import * as formActions from '../../../store/form/actions';

import ActionCard from '../../../components/ActionCard';
import BillsForm from '../BillsForm';
import AddBillForm from '../BillsForm/AddBillForm';
// import EditBillForm from '../BillsForm/EditBillForm';
// import SortBillForm from '../BillsForm/SortBillForm';
// import FilterBillForm from '../BillsForm/FilterBillForm';

class ActionsPage extends Component {
    // constructor(props) {
    //     super(props);

        // this.state = {
        //     sort: 'create-up',
        //     filter: {
        //         archive: {
        //             value: '0',
        //             label: 'Показывать архиные счета?',
        //             type: 'radio',
        //             values: [
        //                 {
        //                     value: '0',
        //                     label: 'Нет'
        //                 },
        //                 {
        //                     value: '1',
        //                     label: 'Да'
        //                 },
        //             ]
        //         },
        //         types: {
        //             value: ['0', '1'],
        //             label: 'Отображать типы счетов:',
        //             type: 'checkbox',
        //             values: [
        //                 {
        //                     value: '0',
        //                     label: 'Наличные средства'
        //                 },
        //                 {
        //                     value: '1',
        //                     label: 'Банковские карты'
        //                 },
        //                 {
        //                     value: '2',
        //                     label: 'Кредитные счета'
        //                 },
        //                 {
        //                     value: '3',
        //                     label: 'Депозитные счета'
        //                 },
        //             ]
        //         },
        //     }
        // };

        // this.handleSortSelect = this.handleSortSelect.bind(this);
        // this.handleFilterSelect = this.handleFilterSelect.bind(this);
    // }
    
    componentDidMount() {
        const { getDataOnLoad, path } = this.props;

        axios.get(`/api?path=${path}`)
            .then(res => getDataOnLoad(res.data))
            .catch(err => console.error(err));
    }

    // handleSortSelect(event, value) {
    //     this.setState({ sort: value }); 
    //     this.props.toggleSortForm(event);       
    // }

    // handleFilterSelect(event, filter) {
    //     this.setState({ filter }); 
    //     this.props.toggleFilterForm(event);       
    // }

    render() {   
        const { 
            operations, 
            operationsId, 
            billsId,
            bills,
            toggleAddForm, 
            // toggleEditForm, 
            // toggleSortForm, 
            // toggleFilterForm, 
            formShow 
        } = this.props;
        
        return (
            <div className="bills">
                <div className="bills__list">
                    {typeof operationsId !== 'undefined' ? 
                        operationsId.map((operation, index) => {
                            return (
                                <div key={index} className="bills__list-item">
                                    <ActionCard  {...operations[operation]} bill={bills[operations[operation].billId]} />
                                </div>
                            );
                        }) : ''}
                    <div className="bills__list-item">
                        <div className="bill bill--add">
                            <a href="/createbill" 
                                className="bill-add" 
                                onClick={event => {
                                    event.preventDefault();
                                    if (!billsId.length) return;
                                    toggleAddForm(event);
                                }}>
                                <svg className="bill-add__icon">
                                    <use xlinkHref="#add-operation-icon" />
                                </svg>
                                Добавить операцию
                            </a>
                        </div>
                    </div>
                </div>
                <BillsForm title="Добавить операцию" 
                    show={formShow.showAddForm} 
                    toggleForm={event => toggleAddForm(event)}>
                    <AddBillForm isModal={true} />
                </BillsForm>
                {/* <BillsForm title="Изменить счет" 
                    show={formShow.showEditForm} 
                    toggleForm={event => toggleEditForm(event)}>
                    <EditBillForm isModal={true} />
                </BillsForm> */}
                {/* <BillsForm title="Сортировка" 
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
                </BillsForm> */}
                <div className="bills__overlay"></div>
            </div>
        );
    }
}

ActionsPage.propTypes = {
    path: PropTypes.string.isRequired,
    getDataOnLoad: PropTypes.func.isRequired,
    userId: PropTypes.number,
    formShow: PropTypes.object,
    operations: PropTypes.object,
    operationId: PropTypes.array,
    billsId: PropTypes.array,
    toggleAddForm: PropTypes.func.isRequired,
};

function mapStateToProps(state) {   
    return {
        operations: state.operation.operations,
        operationsId: state.operation.operationIds,
        billsId: state.bill.billIds,
        bills: state.bill.bills,
        formShow: state.form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleAddForm: event => {
            event.preventDefault();
            dispatch(formActions.toggleAddForm());
        },
        // toggleEditForm: event => {
        //     event.preventDefault();
        //     dispatch(formActions.toggleEditForm());
        // },
        // toggleSortForm: event => {
        //     event.preventDefault();
        //     dispatch(formActions.toggleSortForm());
        // },
        // toggleFilterForm: event => {
        //     event.preventDefault();
        //     dispatch(formActions.toggleFilterForm());
        // }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActionsPage);
