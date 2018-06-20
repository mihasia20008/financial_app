import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import axios from 'axios';

import { toggleAddBillForm } from '../../../store/bill/actions';

import './style.css';

import AddBillForm from '../AddBillForm';
import BillCard from '../../../components/BillCard';

class BillsPage extends Component {
    componentDidMount() {
        const { getDataOnLoad, path } = this.props;

        axios.get(`/api?path=${path}`)
            .then(res => getDataOnLoad(res.data))
            .catch(err => console.error(err));
    }

    render() {   
        const { bills, billsId, showAddForm, toggleAddForm } = this.props;
        
        document.body.style.overflow = !showAddForm ? 'auto' : 'hidden';

        return (
            <div className="bills">
                <div className="bills__list">
                    {typeof billsId !== 'undefined' ? billsId.map((bill, index) => {
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
                                onClick={event => toggleAddForm(event, showAddForm)}>
                                <svg className="bill-add__icon">
                                    <use xlinkHref="#add-bill-icon" />
                                </svg>
                                Добавить счет
                            </a>
                        </div>
                    </div>
                </div>
                <div className={cx("bills__add-form bills-add", {
                    'bills__add-form--show': showAddForm
                })}>
                    <h3 className="bills-add__title">Добавить счет</h3>
                    <button type="button"
                        className="bills-add__close" 
                        onClick={event => toggleAddForm(event, showAddForm)}>
                        <svg className="bills-add__close-icon">
                            <use xlinkHref="#close-icon" />
                        </svg>
                    </button>
                    {!showAddForm ? '' :
                        <div className="bills-add__content">
                            <AddBillForm isModal={true} />
                        </div>
                    }
                </div>
                <div className="bills__overlay"></div>
            </div>
        );
    }
}

BillsPage.propTypes = {
    path: PropTypes.string.isRequired,
    getDataOnLoad: PropTypes.func.isRequired,
    userId: PropTypes.number,
    bills: PropTypes.object,
    billsId: PropTypes.array,
    showAddForm: PropTypes.bool.isRequired,
    toggleAddForm: PropTypes.func.isRequired
};

function mapStateToProps(state) {   
    return {
        bills: state.bill.bills,
        billsId: state.bill.billIds,
        showAddForm: state.bill.showAddForm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleAddForm: (event, showAddForm) => {
            event.preventDefault();
            dispatch(toggleAddBillForm());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BillsPage);
