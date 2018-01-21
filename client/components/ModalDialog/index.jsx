import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Dialog, FlatButton, TextField } from 'material-ui';

const style = {
    backgroungColor: 'rgba(0, 0, 0, 0.74)',
    error: {
		color: '#ef0032',
  		fontSize: '16px'
	},
};

class ModalDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open,
            user: localStorage.getItem('userId'),
            password: '',
            error: {
				show: false,
				value: ''
			},
			redirect: false
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleCancel() {
        localStorage.removeItem('userId');
        this.setState({ redirect: true });
    }

    handleSubmit() {
        fetch('/api/login', {
            headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				id: this.state.user, 
                password: this.state.password,
                type: 'pin'
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
			return <Redirect to='/' />;
		}

        const actions = [
            <FlatButton
                key="1"
                label="Подтвердить"
                primary={true}
                onClick={this.handleSubmit}
            />,
            <FlatButton
                key="0"
                label="Отмена"
                onClick={this.handleCancel}
            />
        ];
      
          return (
              <Dialog
                title={this.props.title}
                actions={actions}
                modal={true}
                open={this.state.open}
                contentStyle={style}
              >
                Введите PIN-код, указанный при регистрации, для продолжения использования приложения.
                <TextField 
                    hintText="1234"
                    floatingLabelText="PIN-код"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    fullWidth={true} />
                <br />
                {this.state.error.show ? 
                    <p style={style.error}>
                        {this.state.error.value}
                    </p> : 
                    '' 
                }
              </Dialog>
          );
    }
}

ModalDialog.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    history: PropTypes.object
};

export default ModalDialog;
