import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { AppBar, 
	Divider, 
	FloatingActionButton, 
	IconButton, 
	IconMenu,
	List, 
	ListItem, 
	MenuItem,
	Snackbar } from 'material-ui';
import { grey400, darkBlack } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ContentAdd from 'material-ui/svg-icons/content/add';

import EditCategory from '../EditCategory';

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

		this.state = {
			categories: [],
			infoOpen: false,
			infoText: '',
			changeOpen: false,
			deleted: '',
			edited: {}
		};

		this.handleToggleMenuClick = props.onToggleMenuClick;
		this.handleDeleteItem = this.handleDeleteItem.bind(this);
		this.handleUpdateItem = this.handleUpdateItem.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.handleOpenEditForm = this.handleOpenEditForm.bind(this);
		this.handleCloseEditForm = this.handleCloseEditForm.bind(this);
		this.getCategoriesData = this.getCategoriesData.bind(this);
	}

	getCategoriesData() {
		fetch(`/api/categories/${localStorage.getItem('userId')}`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(categories => categories.reverse())
		.then(categories => this.setState({categories: categories}))
		.catch(err => console.error(err));
	}

	componentDidMount() {
		this.getCategoriesData();
	}

	handleDeleteItem(id) {
		fetch(`/api/categories/${id}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => (res.status === 202) ?
			this.setState({infoOpen: true, infoText: 'Категория успешно удалена.', deleted: id}) :
			this.setState({infoOpen: true, infoText: 'Упс, что-то пошло не так. Повторите попытку.'}))
		.catch(err => console.error(err));
	}

	handleOpenEditForm(id) {
		this.setState(prevState => {
			return {
				changeOpen: true,
				edited: prevState.categories.filter(category => category.id === id).pop()
			};
		});
	}

	handleCloseEditForm() {
		this.setState({
			changeOpen: false,
			edited: {}
		});
	}

	handleUpdateItem(data) {
		fetch(`/api/categories/${data.id}`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(res => (res.status === 204) ?
			this.setState({
				infoOpen: true, 
				infoText: 'Категория успешно обновлена.',
				changeOpen: false,
				edited: {}
			}) :
			this.setState({infoOpen: true, infoText: 'Упс, что-то пошло не так. Повторите попытку.'}))
		.catch(err => console.error(err));
	}

	handleRequestClose() {
		this.state.deleted ? 
			this.setState(prevState => {
				return {
					infoOpen: false,
					categories: prevState.categories.filter(category => category.id !== prevState.deleted),
					deleted: ''
				}
			}) :
			(
				this.setState({infoOpen: false}),
				this.getCategoriesData()
			);  
    }

	render() {
		const iconButtonElement = (
			<IconButton
			  	touch={true}
			  	tooltip="Опции"
			  	tooltipPosition="bottom-left" >
			  	<MoreVertIcon color={grey400} />
			</IconButton>
		);
		  
		const rightIconMenu = (id) => {
			return (
				<IconMenu iconButtonElement={iconButtonElement}>
					<MenuItem onClick={() => this.handleOpenEditForm(id)}>
						Изменить
					</MenuItem>
					<MenuItem onClick={() => this.handleDeleteItem(id)}>
						Удалить
					</MenuItem>
				</IconMenu>
			);
		};

		const categories = this.state.categories.map(category => {
			return (
				<div key={category.id}>
					<ListItem
						leftIcon={<CommunicationChatBubble />}
						rightIconButton={rightIconMenu(category.id)}
						primaryText={category.name}
						secondaryText={
							<p>
								Тип категории: <span style={{color: darkBlack}}>{category.cost ? 'Расходная' : 'Доходная'}</span><br />
							</p>
						}
						secondaryTextLines={1} />
					<Divider inset={true} />
				</div>
			);
		});

		return (
			<div>
				<AppBar
					title="Категории"
					onLeftIconButtonClick={this.handleToggleMenuClick}
					className="app-title"
				/>
				<List>{categories}</List>
				<Link to={`${this.props.match.url}/add`}>
					<FloatingActionButton style={style.addButton}>
						<ContentAdd />
					</FloatingActionButton>
				</Link>
				{this.state.changeOpen && <EditCategory category={this.state.edited} 
					open={this.state.changeOpen} 
					onEditCancel={this.handleCloseEditForm}
					onEditComplete={data => this.handleUpdateItem(data)} />}
				<Snackbar
                    open={this.state.infoOpen}
                    message={this.state.infoText}
                    autoHideDuration={1000}
                    onRequestClose={this.handleRequestClose} />
			</div>
		);
	}
}

CategoriesPage.propTypes = {
	onToggleMenuClick: PropTypes.func.isRequired,
	match: PropTypes.object
};

export default CategoriesPage;
