import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import App from '../App';
import Modal from '../Modal';

const Container = ({component, privateRoute, ...rest}) => {
        if (privateRoute) {
            if (localStorage.getItem('user') && !localStorage.getItem('confirm'))
                return [
                    <Route key={0} {...rest} render={matchProps => <App {...matchProps} component={component} />} />,
                    <Modal key={1} />
                ];
            if (!localStorage.getItem('user'))
                return <Redirect to={{ pathname: '/' }} />;
        } 
        return <Route {...rest} render={matchProps => <App {...matchProps} component={component} />} />;
}

Container.propTypes = {
	component: PropTypes.func.isRequired,
    privateRoute: PropTypes.bool
};

export default Container;
