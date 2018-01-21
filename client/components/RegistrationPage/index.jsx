import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { AppBar, Card, CardActions, CardHeader, CardText, MenuItem, RaisedButton, SelectField, TextField } from 'material-ui';

// import { interactionActions } from '../../actions';


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
			if (res.status == 201) {
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
					<CardHeader
						title="Заполните поля для регистрации в приложении"	/>
					<CardText>
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
							onChange={this.handleChange} >
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
						<Link to="/login">
							<RaisedButton onClick={this.goBack} label="Отмена	" />
						</Link>
					</CardActions>
				</Card>
			</div>
		);
	}
}
