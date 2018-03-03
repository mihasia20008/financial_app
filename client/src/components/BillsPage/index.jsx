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
import ContentAdd from 'material-ui/svg-icons/content/add';

import EditBill from '../EditBill';

const style = {
	addButton: {
		position: 'absolute',
		right: 30,
		bottom: 30
	},
	itemIcon: {
		top: '10px',
		width: '44px',
		height: '44px'
	}
};

class BillsPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bills: [],
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
		this.getBillsData = this.getBillsData.bind(this);
	}

	getBillsData() {
		fetch(`/api/bills/${localStorage.getItem('userId')}`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(bills => bills.map(bill => {
			bill.value = bill.value.toFixed(2).replace(/./g, function(c, i, a) {
				return i && c !== "." && ((a.length - i) % 3 === 0) ? ' ' + c : c;
			});
			return bill;
		}).reverse())
		.then(bills => this.setState({bills: bills}))
		.catch(err => console.error(err));
	}

	componentDidMount() {
		this.getBillsData();
	}

	handleDeleteItem(id) {
		fetch(`/api/bills/${id}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => (res.status === 202) ?
			this.setState({infoOpen: true, infoText: 'Счет успешно удален.', deleted: id}) :
			this.setState({infoOpen: true, infoText: 'Упс, что-то пошло не так. Повторите попытку.'}))
		.catch(err => console.error(err));
	}

	handleOpenEditForm(id) {
		this.setState(prevState => {
			return {
				changeOpen: true,
				edited: prevState.bills.filter(bill => bill.id === id).pop()
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
		fetch(`/api/bills/${data.id}`, {
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
				infoText: 'Счет успешно обновлен.',
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
					bills: prevState.bills.filter(bill => bill.id !== prevState.deleted),
					deleted: ''
				}
			}) :
			(
				this.setState({infoOpen: false}),
				this.getBillsData()
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

		const billIcon = (currency) => {
			switch (currency) {
				case "DOL":
					return (
						<svg style={style.itemIcon}>
							<use xlinkHref="#dollar-icon" />
						</svg>
					);
				case "EUR":
					return (
						<svg style={style.itemIcon}>
							<use xlinkHref="#euro-icon" />
						</svg>
					);
				default:
					return (
						<svg style={style.itemIcon}>
							<use xlinkHref="#ruble-icon" />
						</svg>
					);
			}
		};

		const billCurrency = (currency) => {
			switch (currency) {
				case "DOL":
					return "$";
				case "EUR":
					return "€";
				default:
					return "руб.";
			}
		};

		const billType = (type) => {
			switch (type) {
				case "nal":
					return "Наличные средства";
				case "bill":
					return "Банковский счет";
				default:
					return "Банковская карта";
			}
		}

		const bills = this.state.bills.map(bill => {
			return (
				<div key={bill.id}>
					<ListItem
							leftIcon={billIcon(bill.currency)}
							rightIconButton={rightIconMenu(bill.id)}
							primaryText={bill.name}
							secondaryText={
								<p>
									Тип счета: <span style={{color: darkBlack}}>{billType(bill.type)}</span><br />
									Баланс: <span style={{color: darkBlack}}>{bill.value} {billCurrency(bill.currency)}</span><br />
								</p>
							}
							secondaryTextLines={2} />
					<Divider inset={true} />
				</div>
			);
		});

		return (
			<div>
				<AppBar
					title="Счета"
					onLeftIconButtonClick={this.handleToggleMenuClick}
					className="app-title"
				/>
				<List>{bills}</List>
				<Link to={`${this.props.match.url}/add`}>
					<FloatingActionButton style={style.addButton}>
						<ContentAdd />
					</FloatingActionButton>
				</Link>
				{this.state.changeOpen && <EditBill bill={this.state.edited} 
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

BillsPage.propTypes = {
	onToggleMenuClick: PropTypes.func.isRequired,
	match: PropTypes.object
};

export default BillsPage;
