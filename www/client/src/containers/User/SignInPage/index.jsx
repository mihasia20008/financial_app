import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import cx from 'classnames';

import * as userActions from '../../../store/user/actions';

class SignInPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            isLogin: true,
            passType: 'password'
        };

        this.handlerInputNameChange = this.handlerInputNameChange.bind(this);
        this.handlerInputPassChange = this.handlerInputPassChange.bind(this);
        this.handlerShowPassword = this.handlerShowPassword.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    componentDidMount() {
        const { getDataOnLoad, path } = this.props;

        axios.get(`/api?path=${path}`)
            .then(res => getDataOnLoad(res.data))
            .catch(err => console.error(err));
    }

    handlerInputNameChange(value) {
        this.setState({
            login: value,
            isLogin: value.split('@').length === 1
        });
    }

    handlerInputPassChange(password) {
        this.setState({password});
    }

    handlerShowPassword() {
        const { passType } = this.state;
        this.setState({passType: passType === 'password' ? 'text' : 'password'});
    }
    
    handlerSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props;

        const authData = {
            type: 'pass',
            auth: this.state.login,
            password: this.state.password,
            isLogin: this.state.isLogin
        };

        dispatch(userActions.authUser(authData));

        // axios.post('/api/signin', {
        //     type: 'pass',
        //     auth: login,
        //     password,
        //     isLogin
        // })
        //     .then(res => {
        //         if (res.status !== 200) return;
        //         const { data } = res;
        //         if (data.confirmAccount) {
        //             localStorage.setItem('user', data.login);
        //             localStorage.setItem('confirm', true);
        //             this.setState({isAuth: 1});
        //         } else this.setState({isAuth: 2});
        //     })
        //     .catch(err => global.alert(err.response.data.message));
    }

    render() {
        const { isLogin, passType } = this.state;
        const { isAuth } = this.props;

        if (isAuth === 1 || localStorage.getItem('user'))
            return <Redirect to={{ pathname: '/actions' }} />;

        if (isAuth === 2)
            return <Redirect to={{ pathname: '/needconfirm' }} />;

        return (
            <div className="auth-page">
                <div className="auth-page__wrap">
                    <svg className="auth-page__icon">
                        <use xlinkHref="#app-icon" />
                    </svg>
                    <h1 className="auth-page__title">EasyCosts</h1>
                    <form className="auth-page__form" action="">
                        <div className="form-group">
                            <input id="input-name" className="form-group__input" type="text" required onChange={event => this.handlerInputNameChange(event.target.value)} />
                            <svg className="form-group__icon">
                                <use xlinkHref="#person-icon" />
                            </svg>
                            <span className="form-group__bar"></span>
                            <label className="form-group__label" htmlFor="input-name">{isLogin ? 'Логин' : 'Электронная почта'}</label>
                        </div>
                        <div className="form-group">
                            <input id="input-pass" className="form-group__input" type={passType} required  onChange={event => this.handlerInputPassChange(event.target.value)} />
                            <svg className="form-group__icon">
                                <use xlinkHref="#pass-icon" />
                            </svg>
                            <span className="form-group__bar"></span>
                            <label className="form-group__label" htmlFor="input-pass">Пароль</label>
                            <button className="form-group__button" type="button" onClick={this.handlerShowPassword}>
                                <svg className="form-group__button-icon">
                                    <use xlinkHref={cx({
                                        [`#${passType}-pass-icon`]: true
                                    })} />
                                </svg>
                            </button>
                        </div>
                        <button className="form-group__submit" type="submit" onClick={event => this.handlerSubmit(event)}>
                            Войти
                        </button>
                        <div className="form-group__links">
                            <Link className="form-group__links-item" to="/signup">
                                Нет аккаунта?
                            </Link>
                            <Link className="form-group__links-item" to="/forgotpassword">
                                Забыли пароль?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    
}

SignInPage.propTypes = {
    getDataOnLoad: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    isAuth: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        isAuth: state.user.isAuth
    };
}

export default connect(mapStateToProps)(SignInPage);
