import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import { toCapitalize, formatNumber } from '../../helpers';
import { deleteOperation } from '../../store/operation/actions';

import './style.css';

class ActionCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.toggleActions = this.toggleActions.bind(this);
    }

    toggleActions() {
        if (!this.state.open) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState({open: !this.state.open});
    }

    handleDeleteBill(id) {
        this.props.deleteOperation(id);
        this.toggleActions();
    }

    // handleToggleArchiveBill(id, isArchival, type) {
    //     this.props.toggleArchiveBill(id, isArchival, type);
    //     this.toggleActions();
    // }

    handleOutsideClick(event) {
        if (this.node && this.node.contains(event.target)) return;     
        this.toggleActions();
    }

    renderBillType(type) {
        switch(type) {
            case 1:
                return 'Расход';
            case 2:
                return 'Кредитный счёт';
            case 3:
                return 'Депозитный счёт';
            default:
                return 'Доход';
        }
    }

    renderBillCurrency(currency) {
        switch(currency) {
            case 1:
                return 'USD';
            case 2:
                return 'EUR';
            default:
                return 'RUB';
        }
    }

    render() {
        const { open } = this.state;
        const { id, type, amount, comment, bill, date } = this.props;
        return ([
            <button type="button" key={0} className={cx("bill", {
                'bill--cash': type === 2,
                'bill--card': type === 1,
                'bill--credit': type === 0,
                'bill--deposit': type === 3,
                'bill--swype': open
            })} onClick={() => this.toggleActions()}>
                <h3 className="bill__name">{date.substr(0, 10)}</h3>
                <p className="bill__type">
                    Тип: 
                    <b className="bill__type-name">{this.renderBillType(type)}</b>
                </p>
                <div className="bill__info">
                    <div className="bill__balance">
                        <span className="bill__value">
                            <b className="bill__value-name">{formatNumber(amount)}</b>
                            {this.renderBillCurrency(typeof bill !== 'undefined' ? bill.currency : 0)}
                        </span>
                        <span className="bill__text">Сумма операции</span>
                    </div>
                    {typeof bill !== 'undefined' ? <div className="bill__limit">
                        <span className="bill__value">
                            <b className="bill__value-name">{bill.name}</b>
                        </span>
                        <span className="bill__text">Лимит</span>
                    </div> : ''}
                </div>
            </button>,
            <div key={1} className="bill-actions" ref={node => { this.node = node; }}>
                {/* <div className="bill-actions__item">
                    <button type="button" className="bill-action bill-action--edit">
                        <svg className="bill-action__icon">
                            <use xlinkHref="#edit-icon" />
                        </svg>
                        <h5 className="bill-action__name">Изменить</h5>
                    </button>
                </div> */}
                {/* <div className="bill-actions__item">
                    <button type="button" 
                        className="bill-action bill-action--archive"
                        onClick={() => this.handleToggleArchiveBill(id, !isArchival, type)}>
                        <svg className="bill-action__icon">
                            <use xlinkHref="#archive-icon" />
                        </svg>
                        <h5 className="bill-action__name">
                            {isArchival ? 'Архивный' : 'В архив'}
                        </h5>
                    </button>
                </div> */}
                <div className="bill-actions__item">
                    <button type="button" 
                        className="bill-action bill-action--delete"
                        onClick={() => this.handleDeleteBill(id)}>
                        <svg className="bill-action__icon">
                            <use xlinkHref="#delete-icon" />
                        </svg>
                        <h5 className="bill-action__name">Удалить</h5>
                    </button>
                </div>
            </div>
        ]);
    }
}

ActionCard.propTypes = {
    type: PropTypes.number.isRequired, 
    name: PropTypes.string.isRequired, 
    value: PropTypes.number.isRequired, 
    currency: PropTypes.number.isRequired, 
    number: PropTypes.string, 
    limit: PropTypes.number,
    isArchival: PropTypes.bool.isRequired,
    deleteOperation: PropTypes.func.isRequired,
    // toggleArchiveBill: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        deleteOperation: id => dispatch(deleteOperation(id)),
        // toggleArchiveBill: (id, isArchival, type) => dispatch(toggleArchiveBill(id, isArchival, type))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(ActionCard);