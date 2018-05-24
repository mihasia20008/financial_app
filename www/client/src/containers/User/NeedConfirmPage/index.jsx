import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class NeedConfirmPage extends Component {
    componentDidMount() {
        const { getDataOnLoad, path } = this.props;

        axios.get(`/api?path=${path}`)
            .then(res => getDataOnLoad(res.data))
            .catch(err => console.error(err));
    }

    render() {
        if (localStorage.getItem('user'))
            return <Redirect to={{ pathname: '/actions' }} />;

        return (
            <div className="auth-page">
                <div className="auth-page__wrap">
                    <svg className="auth-page__icon">
                        <use xlinkHref="#app-icon" />
                    </svg>
                    <h1 className="auth-page__title">EasyCosts</h1>
                    <p className="auth-page__text">
                        На почту, указанную при регистрации, отправлено письмо с инструкциями для подтверждения аккаунта. <br/><br/>
                        Использование сервиса будет доступно после подтверждения аккаунта.
                    </p>
                    <Link className="form-group__submit" to="/">
                        Авторизоваться
                    </Link>
                    <div className="form-group__links">
                        <Link className="form-group__links-item" to="/signup">
                            Нет аккаунта?
                        </Link>
                        <Link className="form-group__links-item" to="/forgotpassword">
                            Забыли пароль?
                        </Link>
                    </div>                   
                </div>
            </div>
        );
    }
}

NeedConfirmPage.propTypes = {
    getDataOnLoad: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
};

export default NeedConfirmPage;
