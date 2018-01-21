import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import RenderMergedProps from '../RenderMergedProps';
  
const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            const props = Object.assign({}, routeProps, rest);
            return <RenderMergedProps component={component} {...props} />;
        }}/>
    );
};

PropsRoute.propTypes = {
    component: PropTypes.func.isRequired
};

export default PropsRoute;
