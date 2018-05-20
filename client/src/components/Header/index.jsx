import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

import BurgerIcon from '../BurgerIcon';

const Header = ({title, menuIsOpen, headerHidden, toggleMenu}) => {
    return (
        <div className="header">
            <button className="header__button" type="button" onClick={toggleMenu}>
                <BurgerIcon active={menuIsOpen} direction="right" />
            </button>
            <h1 className="header__title">{title}</h1>
        </div>
    );
};

Header.propTypes = {
    headerHidden: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    menuIsOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired
};

export default Header;
