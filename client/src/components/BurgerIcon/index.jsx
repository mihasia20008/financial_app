import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.css';

const BurgerIcon = ({active, direction}) => {
    return (
        <div className={cx('burger', { 
            'burger--active': active,
            [`burger--${direction}`]: true
        })}>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
        </div>
    );
};

BurgerIcon.defaultProps = {
    direction: 'left'
};

BurgerIcon.propTypes = {
    active: PropTypes.bool.isRequired,
    direction: PropTypes.string
};

export default BurgerIcon;