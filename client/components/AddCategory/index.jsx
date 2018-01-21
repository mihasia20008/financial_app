import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AppBar, 
    Card, 
    CardActions, 
    CardTitle, 
    CardText, 
    Checkbox, 
    RaisedButton, 
    Snackbar, 
    TextField } from 'material-ui';

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

class AddCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            cost: true,
            redirect: false,
            infoOpen: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleToggleMenuClick = props.onToggleMenuClick;
        this.handleCostChange = this.handleCostChange.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
		this.props.history.goBack();
	}

    handleCostChange() {
        this.setState({ cost: !this.state.cost });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleRequestClose() {
        this.props.history.push('/categories');
    }
    
    handleSubmit() {
		fetch('/api/categories/new', {
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
			return <Redirect to='/categories' />;
		}

        return (
            <div>
                <AppBar
                    title="Добавить категорию"
                    onLeftIconButtonClick={this.handleToggleMenuClick}
                    className="app-title" />
                <Card className="card-wrap">
					<CardTitle
						title="Заполните поля для добавления новой категории"
						style={style.title}
						titleStyle={style.titleText} />
					<CardText style={style.text} >
						<TextField
							hintText="Новая категория"
							floatingLabelText="Название"
							name="name"
							value={this.state.name}
							onChange={this.handleChange}
                            fullWidth={true} />
                        <br />
                        <Checkbox
                            label="Расходная категория"
                            checked={this.state.cost}
                            onCheck={this.handleCostChange}
                            style={style.checkbox} />
                        <br />
                        <Checkbox
                            label="Доходная категория"
                            checked={!this.state.cost}
                            onCheck={this.handleCostChange} />
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
                        'Категория успешно добавлена.' : 
                        'Упс, что-то пошло не так. Повторите попытку.'}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose} />
            </div>
        );
    }
}

export default AddCategory;
