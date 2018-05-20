import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class ForgotPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            isSend: false
        };

        this.hangleInputEmailBlur = this.hangleInputEmailBlur.bind(this);
        this.hangleInputChange = this.hangleInputChange.bind(this);
        this.hangleSubmitForm = this.hangleSubmitForm.bind(this);
    }

    hangleInputChange(target) {
        if (target.closest('.form-group').classList.contains('form-group--error') && target.value !== '')
            target.closest('.form-group').classList.remove('form-group--error');  

        this.setState({email: target.value});
    }

    hangleInputEmailBlur(target) {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const formGoup = target.closest('.form-group');
        if (target.value === '') {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');  
            formGoup.querySelector('.form-group__error').innerText = 'Поле обязательно для заполнения!';
        } else if (target.value.length > 320) {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');  
            formGoup.querySelector('.form-group__error').innerText = 'Превышено максимальное количество символов!';            
        } else if (!regex.test(String(target.value).toLowerCase())) {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');  
            formGoup.querySelector('.form-group__error').innerText = 'Введен неверный адрес электронной почты!';            
        } else {
            axios.get(`/api/checkdata?param=email&value=${target.value.toLowerCase()}`)
                .then(res => {
                    if (res.data.result === 0) {
                        formGoup.classList.add('form-group--error');
                        formGoup.classList.remove('form-group--success');  
                        formGoup.querySelector('.form-group__error').innerText = 'Пользователь с таким E-Mail не найден!'; 
                    } else {
                        formGoup.classList.remove('form-group--error'); 
                        formGoup.classList.add('form-group--success');  
                    }
                })
                .catch(err => console.log(err));
        }
    }

    hangleSubmitForm(event) {
        event.preventDefault();

        if (!document.querySelectorAll('.form-group--error').length) {
            axios.post('/api/forgotpassword', {
                email: this.state.email
            })
                .then(res => {
                    if (res.status !== 200) {
                        global.alert('Ошибка отправки письма с инструкциями!');
                        return;
                    }
                    this.setState({isSend: true});
                })
                .catch(err => {
                    global.alert(`Ошибка сервера. \n${err.response.data.code}: ${err.response.data.info} \n\nРазработчики уже усправляют эту проблему.`);
                });
        }
    }

    render() {
        if (localStorage.getItem('user'))
            return <Redirect to={{ pathname: '/actions' }} />;

        const { isSend, email } = this.state;

        return (
            <div className="auth-page">
                <div className="auth-page__wrap">
                    <svg className="auth-page__icon">
                        <use xlinkHref="#app-icon" />
                    </svg>
                    <h1 className="auth-page__title">EasyCosts</h1>
                    {isSend ? <p className="auth-page__text">Письмо с инструкциями по восстановлению пароля было отправлено на указанный адрес электронной почты</p> : ''}
                    <form className="auth-page__form" action="">{
                        !isSend ?
                            ([<div key={0} className="form-group">
                                <input id="input-email" 
                                    name="email" 
                                    className="form-group__input" 
                                    type="text"
                                    value={email}
                                    required
                                    onChange={event => this.hangleInputChange(event.target)}
                                    onBlur={event => this.hangleInputEmailBlur(event.target)} />
                                <svg className="form-group__icon">
                                    <use xlinkHref="#email-icon" />
                                </svg>
                                <span className="form-group__bar"></span>
                                <span className="form-group__error">Поле обязательно для заполнения!</span>
                                <label className="form-group__label" htmlFor="input-email">Электронная почта</label>
                            </div>,
                            <button key={1} className="form-group__submit" type="submit" onClick={event => this.hangleSubmitForm(event)}>Восстановить</button>]) :
                            <Link className="form-group__submit" to="/">
                                Авторизоваться
                            </Link>
                        }
                        <div className="form-group__links">
                            <Link className="form-group__links-item" to="/signup">
                                Нет аккаунта?
                            </Link>
                            <Link className="form-group__links-item" to="/">
                                Вход в систему
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }   
}

export default ForgotPage;
