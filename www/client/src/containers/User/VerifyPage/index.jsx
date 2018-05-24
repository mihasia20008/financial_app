import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import { getParamsFromUrl } from '../../../helpers';

class VerifyPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeIsOver: false,
            confirm: 0
        };
    }

    componentDidMount() {
        const { getDataOnLoad, path } = this.props;

        axios.get(`/api?path=${path}`)
            .then(res => getDataOnLoad(res.data))
            .catch(err => console.error(err));

        const id = getParamsFromUrl('id'),
            hash = getParamsFromUrl('hash');
        
        if (!!id && !!hash) 
            setTimeout(() => {
                axios.get(`/api/confirm?id=${id}&hash=${hash}`)
                    .then(res => {
                        localStorage.setItem('user', res.data.login);
                        localStorage.setItem('confirm', true);
                        this.setState({confirm: 2});
                    })
                    .catch(err => {
                        if (typeof err.response.data.message !== 'undefined') {
                            global.alert(err.response.data.message);
                            this.setState({error: true});
                        } else
                            this.setState({confirm: 1});
                    });
            }, 1000);
        else this.setState({error: true});
    }

    render() {
        if (this.state.confirm !== 2 && localStorage.getItem('user'))
            return <Redirect to={{ pathname: '/actions' }} />;

        if (typeof this.state.error !== 'undefined' && this.state.error)
            return <Redirect to={{ pathname: '/' }} />;

        return (
            <div className="auth-page">
                <div className="auth-page__wrap">
                    <svg className="auth-page__icon">
                        <use xlinkHref="#app-icon" />
                    </svg>
                    <h1 className="auth-page__title">EasyCosts</h1>
                    <p className="auth-page__text">{
                        this.state.confirm ? 
                            this.state.confirm === 2 ? 
                                'Ваш аккаунт успешно подтвержден' :
                                'Во время подтверждения аккаунта произошла ошибка' :
                            'Ожидание подтверждения Вашего аккаунта'
                    }</p>
                    {
                        this.state.confirm ? 
                            this.state.confirm === 2 ? 
                                <Link className="form-group__submit" to="/actions">
                                    Далее
                                </Link> :
                                ([
                                    <Link key={0} className="form-group__submit" to="/">
                                        Авторизоваться
                                    </Link>,
                                    <div key={1} className="form-group__links">
                                        <Link className="form-group__links-item" to="/signup">
                                            Нет аккаунта?
                                        </Link>
                                        <Link className="form-group__links-item" to="/forgotpassword">
                                            Забыли пароль?
                                        </Link>
                                    </div>
                                 ]) :
                            (<svg className="icon-wait icon-wait--middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M244.4 372.4c-12.9 0-23.3 10.4-23.3 23.3v93.1c0 12.9 10.4 23.3 23.3 23.3 12.9 0 23.3-10.4 23.3-23.3v-93.1C267.6 382.8 257.2 372.4 244.4 372.4z" fill="#D1D006"/>
                                <path d="M244.4 0c-12.9 0-23.3 10.4-23.3 23.3v93.1c0 12.9 10.4 23.3 23.3 23.3 12.9 0 23.3-10.4 23.3-23.3V23.3C267.6 10.4 257.2 0 244.4 0z" fill="#F4F469" />                                
                                <path d="M359.6 338.3c-9.1-9.1-23.8-9.1-32.9 0-9.1 9.1-9.1 23.8 0 32.9l65.8 65.8c4.5 4.5 10.5 6.8 16.5 6.8 6 0 11.9-2.3 16.5-6.8 9.1-9.1 9.1-23.8 0-32.9L359.6 338.3z" fill="#E8E634" />
                                <path d="M81.5 232.7H34.9c-12.9 0-23.3 10.4-23.3 23.3 0 12.9 10.4 23.3 23.3 23.3h46.5c12.9 0 23.3-10.4 23.3-23.3C104.7 243.1 94.3 232.7 81.5 232.7z" fill="#FFFFBF" />
                                <path d="M96.3 75c-9.1-9.1-23.8-9.1-32.9 0s-9.1 23.8 0 32.9l65.8 65.8c4.5 4.5 10.5 6.8 16.5 6.8 6 0 11.9-2.3 16.5-6.8 9.1-9.1 9.1-23.8 0-32.9L96.3 75z" fill="#FFFFBF" />
                                <path d="M477.1 232.7H384c-12.9 0-23.3 10.4-23.3 23.3 0 12.9 10.4 23.3 23.3 23.3h93.1c12.9 0 23.3-10.4 23.3-23.3C500.4 243.1 489.9 232.7 477.1 232.7z" fill="#E8E634" />
                                <path d="M392.5 75l-65.8 65.8c-9.1 9.1-9.1 23.8 0 32.9 4.5 4.5 10.5 6.8 16.5 6.8 6 0 11.9-2.3 16.5-6.8l65.8-65.8c9.1-9.1 9.1-23.8 0-32.9C416.3 65.9 401.6 65.9 392.5 75z" fill="#F4F469" />
                            </svg>)
                    }                    
                </div>
            </div>
        );
    }
}

VerifyPage.propTypes = {
    getDataOnLoad: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
};

export default VerifyPage;
