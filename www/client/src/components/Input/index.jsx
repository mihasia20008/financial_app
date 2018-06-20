import React from 'react';
import PropTypes from 'prop-types';

import InputRadio from './InputRadio';
import InputText from './InputText';

const Input = ({type, onBlurEvent, onChangeEvent, ...rest}) => {
    switch(type) {
        case 'radio':
            return <InputRadio
                onBlurParent={target => onBlurEvent(target)}
                onChangeParent={target => onChangeEvent(target)}
                {...rest} />;
        default:
            return <InputText
                onBlurParent={target => onBlurEvent(target)}
                onChangeParent={target => onChangeEvent(target)}
                {...rest} />;
    }
};

Input.propTypes = {
    type: PropTypes.string,
    onBlurEvent: PropTypes.func.isRequired,
    onChangeEvent: PropTypes.func.isRequired
};

export default Input;
