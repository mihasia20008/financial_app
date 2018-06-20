import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

import BurgerIcon from '../BurgerIcon';

const Header = ({title, menuIsOpen, toggleMenu}) => {
    return (
        <div className="header">
            <button className="header__button" type="button" onClick={toggleMenu}>
                <BurgerIcon active={menuIsOpen} direction="right" />
            </button>
            <h1 className="header__title">{title}</h1>
            <button className="header__button header__button--float" type="button" onClick={toggleMenu}>
                <svg className="header__button-icon">
                    <use xlinkHref="#sort-icon" />
                </svg>
            </button>
            <button className="header__button" type="button" onClick={toggleMenu}>
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

export default Header;
