import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.css';

const InputCheckbox = ({ value, name, label, onChangeParent, values, view }) => {
    return (
        <div className="form-group form-group--no-border">
            <label className="form-group__label">{label}</label>
            
            <span className="form-group__error">Поле обязательно для заполнения!</span>
        </div>
    );
};

InputCheckbox.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    onChangeParent: PropTypes.func.isRequired,
    view: PropTypes.number
}

export default InputCheckbox;
