import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.css';

const ActionsFrom = ({ title, children, show, toggleForm }) => {
    document.body.style.overflow = !show ? 'auto' : 'hidden';
    
    return ([
        <div key={0} className={cx("bills-form", {
            'bills-form--show': show
        })}>
            <h3 className="bills-form__title">{title}</h3>
            <button type="button"
                className="bills-form__close" 
                onClick={event => toggleForm(event)}>
                <svg className="bills-form__close-icon">
                    <use xlinkHref="#close-icon" />
                </svg>
            </button>
            {!show ? '' :
                <div className="bills-form__content">
                    {children}
                </div>
            }
        </div>,
    ]);
};

ActionsFrom.propTypes = {
    title: PropTypes.string.isRequired,
	// component: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    toggleForm: PropTypes.func.isRequired
};

export default ActionsFrom;
