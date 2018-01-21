import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { history } from '../../helpers';

import Layout from '../Layout';


import './style.scss';

export default class App extends Component {
	constructor(props) {
		super(props);

		// this.state = {
		// 	isOpen: false
		// };

		// const { dispatch } = this.props;
		// history.listen((location, action) => {
		// 	dispatch(alertActions.clear());
		// 	});
	}

	// handleToggleMenu () {
	// 	this.setState({isOpen: !this.state.open});
	// } 

	render() {
		return (
			<Router>
				<Layout />
			</Router>
		);
	}
}

// const App = ({store}) => {
// 	// <Provider>
// 	// 	<Router>
// 	// 		<Route path="/" component={Home} />
// 	// 	</Router>
// 	// </Provider>
//   console.log(store, 'test');
//   return <div>Test</div>;
// };

