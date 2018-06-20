import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const InputCheckbox = ({ value, isActive, label, onSelectEvent }) => {
    return (
        <label className="checkbox">
            <input className="checkbox__input" 
                type="checkbox"
                value={value}
                checked={isActive}
                onChange={event => onSelectEvent(event.target.value)} />
            <span className="checkbox__label">{label}</span>
        </label>
    );
};

InputCheckbox.propTypes = {
    value: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onSelectEvent: PropTypes.func.isRequired,
};

export default InputCheckbox;
