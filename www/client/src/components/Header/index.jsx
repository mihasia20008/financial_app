import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import * as formActions from '../../store/form/actions';

import './style.css';

import BurgerIcon from '../BurgerIcon';

const Header = ({title, menuIsOpen, toggleMenu, toggleSortForm, toggleFilterForm, filters, sort }) => {
    return (
        <div className="header">
            <button className="header__button" type="button" onClick={toggleMenu}>
                <BurgerIcon active={menuIsOpen} direction="right" />
            </button>
            <h1 className="header__title">{title}</h1>
            <button className={cx('header__button header__button--float', {
                'header__button--hidden': !sort
            })} type="button" onClick={toggleSortForm}>
                <svg className="header__button-icon">
                    <use xlinkHref="#sort-icon" />
                </svg>
            </button>
            <button className={cx('header__button', {
                'header__button--hidden': !filters
            })} type="button" onClick={toggleFilterForm}>
                <svg className="header__button-icon">
                    <use xlinkHref="#filter-icon" />
                </svg>
            </button>
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    menuIsOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        toggleSortForm: event => {
            event.preventDefault();
            dispatch(formActions.toggleSortForm());
        },
        toggleFilterForm: event => {
            event.preventDefault();
            dispatch(formActions.toggleFilterForm());
        },
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Header);
