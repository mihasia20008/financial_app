import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Dialog, FlatButton, TextField } from 'material-ui';

const style = {
    backgroungColor: 'rgba(0, 0, 0, 0.74)'
};

class ModalDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open,
            user: localStorage.getItem('userId'),
            password: '',
            redirect: false
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCancel() {
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
        .then(res => console.log(res));
    }
    

    render() {
        const { redirect } = this.state;

		if (redirect) {
			return <Redirect to='/login' />;
		}

        const actions = [
            <FlatButton
                key="0"
                label="Отмена"
                onClick={this.handleCancel}
            />,
            <FlatButton
                key="1"
                label="Подтвердить"
                primary={true}
                onClick={this.handleSubmit}
            />,
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
                    name="pin"
                    type="password"
                    value={this.state.pin}
                    onChange={this.handleChange}
                    fullWidth={true} />
                <br />
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
