import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AppBar, 
    Card, 
    CardActions, 
    CardTitle, 
    CardText, 
    Checkbox, 
    MenuItem, 
    RaisedButton, 
    SelectField,
    Snackbar, 
    TextField } from 'material-ui';

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
    },
    checkbox: {
        marginTop: '24px'
    }
};

class AddBill extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: '',
            value: '',
            accumulate: false,
            currency: '',
            redirect: false,
            infoOpen: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleToggleMenuClick = props.onToggleMenuClick;
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
		this.props.history.goBack();
	}

    handleCheckboxChange() {
        this.setState({ accumulate: !this.state.accumulate });
    }

    handleSelectChange(event, value) {
        (value === 'RUB' || value === 'DOL' || value === 'EUR') ?
            this.setState({ currency: value }) :
            this.setState({ type: value });
    }

    handleChange(event, index, value) {
		(typeof event.target.name !== 'undefined') ?
			this.setState({ [event.target.name]: event.target.value }) :
			this.handleSelectChange(event, value);
    }

    handleRequestClose() {
        this.props.history.push('/bills');
    }
    
    handleSubmit() {
		fetch('/api/bills/new', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(Object.assign(
                {},
                this.state,
                {user: localStorage.getItem('userId')}
            ))
		})
		.then(res => {
			if (res.status === 201) {
				this.setState({infoOpen: true, dataAdded: true});
            } else {
                this.setState({infoOpen: true, dataAdded: false});
            }
		})
		.catch(err => console.error(JSON.stringify(err)));
	}

    render() {
        const { redirect } = this.state;

		if (redirect) {
			return <Redirect to='/bills' />;
		}

        return (
            <div>
                <AppBar
                    title="Добавить счет"
                    onLeftIconButtonClick={this.handleToggleMenuClick}
                    className="app-title" />
                <Card className="card-wrap">
					<CardTitle
						title="Заполните поля для добавления нового счета"
						style={style.title}
						titleStyle={style.titleText} />
					<CardText style={style.text} >
						<TextField
							hintText="Мой счет"
							floatingLabelText="Название"
							name="name"
							value={this.state.name}
							onChange={this.handleChange}
							fullWidth={true} />
                        <br />
                        <SelectField
                            className="select-item"
							floatingLabelText="Тип счета"
							value={this.state.type}
							name="type"
                            onChange={this.handleChange} 
                            style={style.select} >
							<MenuItem value="nal" primaryText="Наличные" />
							<MenuItem value="card" primaryText="Банковская карта" />
							<MenuItem value="bill" primaryText="Банковский счет" />
						</SelectField>
						<TextField
							hintText="10 000"
							floatingLabelText="Баланс"
							name="value"
							value={this.state.value}
							onChange={this.handleChange}
							fullWidth={true} />
						<br />
                        <SelectField
                            className="select-item"
							floatingLabelText="Валюта счета"
							value={this.state.currency}
							name="currency"
                            onChange={this.handleChange}
                            style={style.select} >
							<MenuItem value="RUB" primaryText="Рубль, &#8381;" />
							<MenuItem value="DOL" primaryText="Доллар, $" />
							<MenuItem value="EUR" primaryText="Евро, &euro;" />
                        </SelectField>
                        <br />
                        <Checkbox
                            label="Счет является накопительным?"
                            checked={this.state.accumulate}
                            onCheck={this.handleCheckboxChange}
                            style={style.checkbox} />
					</CardText>
					<CardActions>
						<RaisedButton 
							label="Добавить" 
							primary={true}
							onClick={this.handleSubmit} />
                        <RaisedButton onClick={this.goBack} label="Отмена	" />
					</CardActions>
                </Card>
                <Snackbar
                    open={this.state.infoOpen}
                    message={this.state.dataAdded ? 
                        'Счет успешно добавлен.' : 
                        'Упс, что-то пошло не так. Повторите попытку.'}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose} />
            </div>
        );
    }
}

export default AddBill;