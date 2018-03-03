import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import RenderMergedProps from '../RenderMergedProps';
import ModalDialog from '../ModalDialog';

const PrivateRoute = ({ component, redirectTo, ...rest}) => {
	return (
	  	<Route {...rest} render={routeProps => {
			if (localStorage.getItem('userId')) {
				const props = Object.assign({}, routeProps, rest);
				return sessionStorage.getItem('userPin') ?
					<RenderMergedProps component={component} {...props} /> :
					<div>
						<RenderMergedProps component={component} {...props} />
						<ModalDialog title="PIN-код для EasyCosts"
							open={true}
							history={routeProps.history}
						/>
					</div>
			} else 			
				return (
					<Redirect to={{ 
						pathname: redirectTo, 
						state: { from: routeProps.location } 
					}} />
				);
	  	}}/>
	);
};


PrivateRoute.propTypes = {
	component: PropTypes.func.isRequired,
	redirectTo: PropTypes.string
};

export default PrivateRoute;
