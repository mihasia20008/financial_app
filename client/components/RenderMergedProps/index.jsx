import React from 'react';
import PropTypes from 'prop-types';

const RenderMergedProps = ({ component: Component, ...rest}) => {
    const finalProps = Object.assign({}, rest);
    return (
        <Component {...finalProps} />
    );
};

RenderMergedProps.propTypes = {
    component: PropTypes.func.isRequired
};

export default RenderMergedProps;
