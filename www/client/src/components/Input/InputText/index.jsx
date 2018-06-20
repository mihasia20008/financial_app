import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({ value, name, label, onBlurParent, onChangeParent }) => {
    return (
        <div className="form-group">
            <input id={`input-${name}`} 
                name={name} 
                className="form-group__input" 
                type="text"
                value={value}
                required
                onChange={event => onChangeParent(event.target)}
                onBlur={event => onBlurParent(event.target)} />
            <span className="form-group__error">Поле обязательно для заполнения!</span>
            <label className="form-group__label" htmlFor={`input-${name}`}>{label}</label>
        </div>
    );
};

InputText.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onBlurParent: PropTypes.func.isRequired,
    onChangeParent: PropTypes.func.isRequired
}

export default InputText;
