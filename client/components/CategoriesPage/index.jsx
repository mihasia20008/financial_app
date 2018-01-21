import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { AppBar, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
	addButton: {
		position: 'absolute',
		right: 30,
		bottom: 30
	}	
};

class CategoriesPage extends Component {
	constructor(props) {
		super(props);

		// this.state = {
		// 	user: props.location.state.user
		// };

		this.handleToggleMenuClick = props.onToggleMenuClick;
	}

	componentDidMount() {

	}

	render() {
		return (
			<div>
				<AppBar
					title="Категории"
					onLeftIconButtonClick={this.handleToggleMenuClick}
					className="app-title"
				/>
				Categories page
				<Link to={`${this.props.match.url}/add`}>
					<FloatingActionButton style={style.addButton}>
						<ContentAdd />
					</FloatingActionButton>
				</Link>
			</div>
		);
	}
}

CategoriesPage.propTypes = {
	onToggleMenuClick: PropTypes.func.isRequired,
	match: PropTypes.object
};

export default CategoriesPage;
