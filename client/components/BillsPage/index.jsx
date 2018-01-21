import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, 
		Divider, 
		FloatingActionButton, 
		IconButton, 
		IconMenu,
		List, 
		ListItem, 
		MenuItem, 
		Subheader } from 'material-ui';
import { grey400, darkBlack } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';

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

export default class BillsPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bills: []
		};

		this.handleToggleMenuClick = props.onToggleMenuClick;
	}

	componentDidMount() {
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

	render() {
		const iconButtonElement = (
			<IconButton
			  	touch={true}
			  	tooltip="Опции"
			  	tooltipPosition="bottom-left" >
			  	<MoreVertIcon color={grey400} />
			</IconButton>
		);
		  
		const rightIconMenu = (
			<IconMenu iconButtonElement={iconButtonElement}>
				<MenuItem>Детали</MenuItem>
				<MenuItem>Правка</MenuItem>
				<MenuItem>Удаление</MenuItem>
			</IconMenu>
		);

		const billIcon = (currency) => {
			switch (currency) {
				case "DOL":
					return (
						<svg style={style.itemIcon}>
							<use xlinkHref="#dollar-icon" />
						</svg>
					);
					break;
				case "EUR":
					return (
						<svg style={style.itemIcon}>
							<use xlinkHref="#euro-icon" />
						</svg>
					);
					break;
				default:
					return (
						<svg style={style.itemIcon}>
							<use xlinkHref="#ruble-icon" />
						</svg>
					);
					break;
			}
		};

		const billCurrency = (currency) => {
			switch (currency) {
				case "DOL":
					return "$";
					break;
				case "EUR":
					return "€";
					break;
				default:
					return "руб.";
					break;
			}
		};

		const billType = (type) => {
			switch (type) {
				case "nal":
					return "Наличные средства";
					break;
				case "bill":
					return "Банковский счет";
					break;
				default:
					return "Банковская карта";
					break;
			}
		}

		const bills = this.state.bills.map(bill => {
			return (
				<div key={bill.id}>
					<ListItem
							leftIcon={billIcon(bill.currency)}
							rightIconButton={rightIconMenu}
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
		})

		return (
			<div>
				<AppBar
					title="Счета"
					onLeftIconButtonClick={this.handleToggleMenuClick}
					className="app-title"
				/>
				<List>
					<Subheader>Сегодня</Subheader>
					{bills}
				</List>
				<Link to={`${this.props.match.url}/add`}>
					<FloatingActionButton style={style.addButton}>
						<ContentAdd />
					</FloatingActionButton>
				</Link>
			</div>
		);
	}
}
