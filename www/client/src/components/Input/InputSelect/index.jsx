import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import cx from 'classnames';

import { toCapitalize } from '../../../helpers';

import './style.css';

class InputSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleFocus = this.handleFocus.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.renderList = this.renderList.bind(this);
        this.handleCloseList = this.handleCloseList.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
        this.handleEmptyListClick = this.handleEmptyListClick.bind(this);
    }

    getInputRef = (node) => {this.citypicker = node};

    handleFocus() {
        document.addEventListener('click', this.handleOutsideClick, false);
        this.setState({ open: true });
        const { name, onBlurParent } = this.props;
        onBlurParent({ name, id: -2, value: '' });
    }

    handleCloseList() {
        this.setState({ open: false });
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    handleOutsideClick(event) {
        if (this.citypicker && this.citypicker.contains(event.target)) return;
        this.handleCloseList();
        this.props.onBlurParent({ name: this.props.name, id: -1 });
    }

    handleListClick(item) {
        const { name, bills, onBlurParent } = this.props;
        this.handleCloseList();
        onBlurParent({ name, id: item, value: bills[item].name });
    }

    handleEmptyListClick() {
        const { name, onBlurParent } = this.props;
        this.handleCloseList();
        onBlurParent({ name, id: -1 });
    }

    renderList() {
        const { fake, billIds, bills } = this.props;

        const billsFilter = billIds.filter(id => {
            return bills[id].name.search(fake) === 0;
        });        

        if (billsFilter.length === 0) return <li className="city-picker__item" onClick={() => this.handleEmptyListClick()}>Ничего не найдено...</li>;
        return billsFilter.map((item, index) => {
            return (
                <li key={index}
                    className="city-picker__item"
                    onClick={() => this.handleListClick(item)}>
                    {toCapitalize(bills[item].name)}
                </li>
            );
        });
    }

    render() {
        const { label,
            fake,
            name,
            onChangeParent } = this.props;
        const { open } = this.state;

        return (
            <div className="form-group"> 
                <div className="city-picker" ref={this.getInputRef}>
                    <input type="text"
                           className="netex-location-selector-input form-group__input"
                           id={`${name}-input`}
                           name={name}
                           value={fake}
                           onFocus={() => this.handleFocus()}
                           onChange={event => onChangeParent(event.target)} />
                    <label className="form-group__label" htmlFor={`${name}-input`}>{label}</label>
                    <ul className={cx('city-picker__container', {
                        'city-picker__container--show': open
                    })}>{this.renderList()}</ul>
                </div>
                <span className="form-group__error">Поле обязательно для заполнения!</span>
            </div>
        );
    }
}

InputSelect.propTypes = {
    label: PropTypes.string.isRequired,
    fake: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onBlurParent: PropTypes.func.isRequired,
    onChangeParent: PropTypes.func.isRequired,
    cities: PropTypes.object,
    citiesId: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        bills: state.bill.bills,
        billIds: state.bill.billIds
    }
}

export default connect(
    mapStateToProps
)(InputSelect);
