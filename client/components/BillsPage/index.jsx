import React, { Component } from 'react';

import { AppBar, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
	position: 'absolute',
	right: 30,
	bottom: 30
};

export default class BillsPage extends Component {
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
					title="Счета"
					onLeftIconButtonClick={this.handleToggleMenuClick}
				/>
				Bills page
				<div>
					<FloatingActionButton style={style}>
						<ContentAdd />
					</FloatingActionButton>
				</div>
			</div>
		);
	}
}
