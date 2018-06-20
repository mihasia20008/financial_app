import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.css';

const InputRadio = ({ value, name, label, onChangeParent, values, view }) => {
    return (
        <div className="form-group form-group--no-border">
            <label className="form-group__label">{label}</label>
            <div className={cx('form-select', {
                'form-select--vertical': view
            })}>        
                {values.map((select, index) => {
                    return (
                        <div key={index} className="form-select__item">
                            <label className={cx('select-item', {
                                'select-item--active': value === select.value
                            })}>
                                <input id={`${name}_${index}`}
                                    className="select-item__input"
                                    type="radio"
                                    name={name}
                                    value={select.value}
                                    onChange={event => onChangeParent(event.target)} />
                                <label className="select-item__text" htmlFor={`${name}_${index}`}>{select.label}</label>
                            </label>
                        </div>
                    )
                })}
            </div>
            <span className="form-group__error">Поле обязательно для заполнения!</span>
        </div>
    );
};

InputRadio.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    onChangeParent: PropTypes.func.isRequired,
    view: PropTypes.number
}

InputRadio.defaultProps = {
    view: 0
};

export default InputRadio;
