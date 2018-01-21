import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { AppBar, Card, CardActions, CardTitle, CardText, MenuItem, RaisedButton, SelectField, TextField } from 'material-ui';

// import { interactionActions } from '../../actions';


const style = {
	error: {
		color: '#ef0032',
  		fontSize: '16px'
	},
	title: {
		paddingBottom: 0
	},
	titleText: {
		fontSize: '20px'
	},
	text: {
		paddingTop: 0
	},
	select: {
		width: '100%'
	}
};


export default class RegistrationPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			password: '',
			confirmPassword: '',
			pin: '',
			currency: '',
			redirect: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.goBack = this.goBack.bind(this);

	}

	goBack() {
		this.props.history.goBack();
	}

	handleChange(event, index, value) {
		(typeof event.target.name !== 'undefined') ?
			this.setState({ [event.target.name]: event.target.value }) :
			this.setState({ currency: value });
	}

	handleSubmit() {
		fetch('/api/signup', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(this.state)
		})
		.then(res => {
			if (res.status === 201) {
				res.json().then(data => {
					localStorage.setItem('userId', data.id);
					this.setState({ redirect: true, user: data });
				});
			}
		})
		.catch(err => console.error(JSON.stringify(err)));
	}

	render() {
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to='/' user={this.state.user} />;
		}

		return (
			<div>
				<AppBar
					title="Регистрация"
					showMenuIconButton={false}
				/>
				<Card className="card-wrap">
					<CardTitle
						title="Заполните поля для регистрации в приложении"
						style={style.title}
						titleStyle={style.titleText} />
					<CardText style={style.text} >
						<TextField
							hintText="+7 (999) 999-99-99"
							floatingLabelText="Номер телефона"
							name="phone"
							type="tel"
							value={this.state.phone}
							onChange={this.handleChange}
							fullWidth={true} />
						<br />
						<TextField
							hintText="Иванов"
							floatingLabelText="Фамилия"
							name="lastName"
							value={this.state.lastName}
							onChange={this.handleChange}
							fullWidth={true} />
						<br />
						<TextField
							hintText="Иван"
							floatingLabelText="Имя"
							name="firstName"
							value={this.state.firstName}
							onChange={this.handleChange}
							fullWidth={true} />
						<br />
						<TextField
							hintText="example@email.com"
							floatingLabelText="E-mail"
							name="email"
							type="email"
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth={true} />
						<br />
						<TextField 
							hintText="someTestPassword123"
							floatingLabelText="Пароль"
							name="password"
							type="password"
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth={true} />
						<br />
						<TextField 
							hintText="someTestPassword123"
							floatingLabelText="Подтверждение пароля"
							name="confirmPassword"
							type="password"
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							fullWidth={true} />
						<br />
						<TextField 
							hintText="1234"
							floatingLabelText="PIN-код"
							name="pin"
							type="password"
							value={this.state.pin}
							onChange={this.handleChange}
							fullWidth={true} />
						<br />
						<SelectField
							floatingLabelText="Валюта по умолчанию"
							value={this.state.currency}
							name="currency"
							onChange={this.handleChange} 
							style={style.select} >
							<MenuItem value={1} primaryText="Рубль, &#8381;" />
							<MenuItem value={2} primaryText="Доллар, $" />
							<MenuItem value={3} primaryText="Евро, &euro;" />
						</SelectField>
					</CardText>
					<CardActions>
						<RaisedButton 
							label="Зарегистрироваться" 
							primary={true}
							onClick={this.handleSubmit} />
						<RaisedButton onClick={this.goBack} label="Отмена	" />
					</CardActions>
				</Card>
			</div>
		);
	}
}
