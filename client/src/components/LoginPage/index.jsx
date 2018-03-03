import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { AppBar, Card, CardActions, CardText, FlatButton, RaisedButton, TextField, CardTitle } from 'material-ui';

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
	}
};


export default class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			phone: '',
			password: '',
			error: {
				show: false,
				value: ''
			},
			redirect: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleAuth = this.handleAuth.bind(this);

	}

	componentDidMount() {
		if (localStorage.getItem('userId')) 
			this.setState({ redirect: true });
	}

	handleChange(event) {
		this.setState({ 
			[event.target.name]: event.target.value,
			error: {
				show: false,
				value: ''
			}
		});
	}

	handleAuth() {
		fetch('/api/login', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				phone: this.state.phone, 
				password: this.state.password,
				type: 'password'
			})
		})
		.then(res => {
			if (res.status === 401) {
				res.json()
				.then(data => this.setState({
					error: {
						show: true,
						value: data.message
					}
				}));
			} else if (res.status === 400) {
				res.json()
				.then(data => console.log(data));
				alert("Упс, что-то пошло не так ¯\\_(ツ)_/¯ \n\nПопробуйте перезагрузить страницу и повторить ввод данных.\n");
			} else {
				res.json()
				.then(data => {
					localStorage.setItem('userId', data.id);
					sessionStorage.setItem('userPin', 'true');
					this.setState({	redirect: true });
				});
			}
		})
		.catch(err => console.error(err));
	}

	render() {
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to={{ 
				pathname: '/', 
				state: { 
					from: this.props.location,
					user: this.state.user  
				} 
			}} />;
		}

		return (
			<div>
				<AppBar
					title="Авторизация"
					showMenuIconButton={false}
				/>
				<Card className="card-wrap">
					<CardTitle
						title="Для продолжения введите логин и пароль"
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
							hintText="someTestPassword123"
							floatingLabelText="Пароль"
							name="password"
							type="password"
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth={true} />
						<br />
					</CardText>
					{this.state.error.show ? 
						<CardText style={style.error}>
							{this.state.error.value}
						</CardText> : 
						'' 
					}
					<CardActions>
						<RaisedButton onClick={this.handleAuth} label="Вход" primary={true} />
						<Link to="/forgotpassword">
							<FlatButton label="Забыли пароль?" />
						</Link>
					</CardActions>
					<CardActions>
						<Link to="/signup">
							<RaisedButton label="Регистрация" />
						</Link>
					</CardActions>
				</Card>
			</div>
		);
	}
}
