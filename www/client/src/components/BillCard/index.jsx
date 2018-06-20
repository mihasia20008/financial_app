import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import { toCapitalize, formatNumber } from '../../helpers';
import { deleteBill } from '../../store/bill/actions';

import './style.css';

class BillCard extends Component {
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
        this.props.deleteBill(id);
    }

    handleOutsideClick(event) {
        if (this.node && this.node.contains(event.target)) return;     
        this.toggleActions();
    }

    renderBillType(type) {
        switch(type) {
            case 1:
                return 'Банковская карта';
            case 2:
                return 'Кредитный счёт';
            case 3:
                return 'Депозитный счёт';
            default:
                return 'Наличные средства';
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
        const { type, name, value, currency, number, limit } = this.props;
        return ([
            <button type="button" key={0} className={cx("bill", {
                'bill--cash': type === 0,
                'bill--card': type === 1,
                'bill--credit': type === 2,
                'bill--deposit': type === 3,
                'bill--swype': open
            })} onClick={() => this.toggleActions()}>
                <h3 className="bill__name">{toCapitalize(name)}</h3>
                <p className="bill__type">
                    Тип: 
                    <b className="bill__type-name">{this.renderBillType(type)}</b>
                </p>
                {typeof number !== 'undefined' ? <p className="bill__number">
                    <span>****</span>
                    <span>****</span>
                    <span>****</span>
                    <span>{number}</span>
                </p> : ''}
                <div className="bill__info">
                    <div className="bill__balance">
                        <span className="bill__value">
                            <b className="bill__value-name">{formatNumber(value)}</b>
                            {this.renderBillCurrency(currency)}
                        </span>
                        <span className="bill__text">Баланс</span>
                    </div>
                    {typeof limit !== 'undefined' ? <div className="bill__limit">
                        <span className="bill__value">
                            <b className="bill__value-name">{formatNumber(limit)}</b>
                            {this.renderBillCurrency(currency)}
                        </span>
                        <span className="bill__text">Лимит</span>
                    </div> : ''}
                </div>
            </button>,
            <div key={1} className="bill-actions" ref={node => { this.node = node; }}>
                <div className="bill-actions__item">
                    <button type="button" className="bill-action bill-action--edit">
                        <svg className="bill-action__icon">
                            <use xlinkHref="#edit-icon" />
                        </svg>
                        <h5 className="bill-action__name">Изменить</h5>
                    </button>
                </div>
                <div className="bill-actions__item">
                    <button type="button" className="bill-action bill-action--archive">
                        <svg className="bill-action__icon">
                            <use xlinkHref="#archive-icon" />
                        </svg>
                        <h5 className="bill-action__name">В архив</h5>
                    </button>
                </div>
                <div className="bill-actions__item">
                    <button type="button" className="bill-action bill-action--delete">
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

BillCard.propTypes = {
    type: PropTypes.number.isRequired, 
    name: PropTypes.string.isRequired, 
    value: PropTypes.number.isRequired, 
    currency: PropTypes.number.isRequired, 
    number: PropTypes.string, 
    limit: PropTypes.number,
    deleteBill: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        deleteBill: id => dispatch(deleteBill(id))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(BillCard);