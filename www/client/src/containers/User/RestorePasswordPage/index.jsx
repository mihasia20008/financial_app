import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import { getParamsFromUrl } from '../../../helpers';

class RestrePasswordPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: {
                value: '',
                label: 'Пароль',
                icon: '#lock-icon',
                type: 'password',
                onBlur: target => this.hangleInputBlur(target),
                onChange: target => this.hangleInputChange(target)
            },
            confirmpassword: {
                value: '',
                label: 'Подтвердите пароль',
                icon: '#lock-icon',
                type: 'password',
                onBlur: target => this.hangleInputBlur(target),
                onChange: target => this.hangleInputChange(target)
            },
            pin: {
                value: '',
                label: 'PIN-код',
                icon: '#lock-icon',
                type: 'password',
                onBlur: target => this.hangleInputBlur(target),
                onChange: target => this.hangleInputChange(target)
            }
        };

        this.hangleInputPasswordBlur = this.hangleInputPasswordBlur.bind(this);
        this.hangleInputConfirmPasswordBlur = this.hangleInputConfirmPasswordBlur.bind(this);
        this.hangleInputPinBlur = this.hangleInputPinBlur.bind(this);

        this.hangleInputChange = this.hangleInputChange.bind(this);
        this.hangleInputBlur = this.hangleInputBlur.bind(this);
        this.hangleSubmitForm = this.hangleSubmitForm.bind(this);
    }

    componentDidMount() {
        const { getDataOnLoad, path } = this.props;

        axios.get(`/api?path=${path}`)
            .then(res => getDataOnLoad(res.data))
            .catch(err => console.error(err));

        const id = getParamsFromUrl('id'),
            hash = getParamsFromUrl('hash');

        if (!id || !hash) this.setState({error: true});
    }

    hangleInputBlur(target) {
        switch (target.getAttribute('name')) {
            case 'password':
                this.hangleInputPasswordBlur(target);
                break;
            case 'confirmpassword':
                this.hangleInputConfirmPasswordBlur(target);
                break;
            case 'pin':
                this.hangleInputPinBlur(target);
                break;
            default: 
                break;
        }
    }

    hangleInputChange(target) {
        if (target.closest('.form-group').classList.contains('form-group--error') && target.value !== '')
            target.closest('.form-group').classList.remove('form-group--error');  
        
        let { value } = target;
        const input = target.getAttribute('name');

        this.setState(prevState => Object.assign(prevState, {
            [`${input}`]: Object.assign(prevState[input], { value })
        }));
    }

    hangleInputPasswordBlur(target) {
        const formGoup = target.closest('.form-group');
        if (target.value === '') {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');
            formGoup.querySelector('.form-group__error').innerText = 'Поле обязательно для заполнения!';
        } else if (target.value.length < 6) {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');            
            formGoup.querySelector('.form-group__error').innerText = 'Пароль слишком короткий!';            
        } else {
            formGoup.classList.remove('form-group--error'); 
            formGoup.classList.add('form-group--success');
        }

        if (this.state.confirmpassword.value !== '')
            if (target.value !== this.state.confirmpassword.value) {
                document.querySelector('#input-confirmpassword').closest('.form-group').classList.add('form-group--error');
                document.querySelector('#input-confirmpassword').closest('.form-group').classList.remove('form-group--success');
                document.querySelector('#input-confirmpassword').closest('.form-group').querySelector('.form-group__error').innerText = 'Пароли не совпадают!';            
            } else {
                document.querySelector('#input-confirmpassword').closest('.form-group').classList.remove('form-group--error');
                if (document.querySelector('#input-password').closest('.form-group').classList.contains('form-group--success'))
                    document.querySelector('#input-confirmpassword').closest('.form-group').classList.add('form-group--success');
            }    
    }
    
    hangleInputConfirmPasswordBlur(target) {
        const formGoup = target.closest('.form-group');
        if (target.value === '') {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');  
            formGoup.querySelector('.form-group__error').innerText = 'Поле обязательно для заполнения!';
        } else if (target.value !== this.state.password.value) {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');  
            formGoup.querySelector('.form-group__error').innerText = 'Пароли не совпадают!';            
        } else {
            formGoup.classList.remove('form-group--error'); 
            formGoup.classList.add('form-group--success');  
        }
    }

    hangleInputPinBlur(target) {
        const formGoup = target.closest('.form-group');
        if (target.value === '') {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');  
            formGoup.querySelector('.form-group__error').innerText = 'Поле обязательно для заполнения!';
        } else if (target.value.length < 4) {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');  
            formGoup.querySelector('.form-group__error').innerText = 'Pin-код слишком короткий!';            
        } else {
            formGoup.classList.remove('form-group--error');    
            formGoup.classList.add('form-group--success');  
        }
    }

    handlerShowPassword(target) {
        const input = target.closest('.form-group').querySelector('input');
        const icon = target.closest('.form-group').querySelector('.form-group__button-icon use');
        if (input.getAttribute('type') === 'password') {
            input.setAttribute('type', 'text');
            icon.setAttribute('xlink:href', '#text-pass-icon');
        } else {
            input.setAttribute('type', 'password');
            icon.setAttribute('xlink:href', '#password-pass-icon');
        }
    }

    hangleSubmitForm(event) {
        event.preventDefault();

        let data = {};
        for (let item in this.state) {
            const inputElement = document.querySelector(`input[name=${item}`);        
            this.hangleInputBlur(inputElement);  
            data[item] = this.state[item].value;
        }
        
        data.id = getParamsFromUrl('id');
        data.hash = getParamsFromUrl('hash');

        if (!document.querySelectorAll('.form-group--error').length) {            
            axios.post('/api/restorepassword', data)
                .then(res => {
                    if (res.status !== 200) {
                        global.alert('Ошибка регистрации пользователя!');
                        return;
                    }
                    this.setState({isChanged: true});
                })
                .catch(err => global.alert(`Ошибка сервера. \n${err.response.data.message}`));
        }
    }

    render() {
        const { isChanged } = this.state;

        if (localStorage.getItem('user'))
            return <Redirect to={{ pathname: '/bills' }} />;

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
                        typeof isChanged === 'undefined' ?                            
                            'Заполните следующие поля для завершения сброса пароля' :
                            'Пароль успешно изменен'
                    }</p>
                    <form className="auth-page__form" action="">{
                        typeof isChanged === 'undefined' ?
                            ([Object.keys(this.state).map((item, index) => {
                                const input = this.state[item];
                                return (
                                    <div key={index} className="form-group">
                                        <input id={`input-${item}`} 
                                            name={item} 
                                            className="form-group__input" 
                                            type={input.type ? input.type : 'text'}
                                            value={input.value}
                                            required
                                            onFocus={() => item === 'phone' && input.value === '' ? 
                                                this.setState(prevState => Object.assign(prevState, {
                                                    phone: Object.assign(prevState.phone, { value: '+7' })
                                                })) : ''}
                                            onChange={event => input.onChange(event.target)}
                                            onBlur={event => input.onBlur(event.target)} />
                                        <svg className="form-group__icon">
                                            <use xlinkHref={input.icon} />
                                        </svg>
                                        <span className="form-group__bar"></span>
                                        <span className="form-group__error">Поле обязательно для заполнения!</span>
                                        <label className="form-group__label" htmlFor={`input-${item}`}>{input.label}</label>
                                        {input.type === 'password' ? 
                                            <button className="form-group__button" type="button" onClick={event => this.handlerShowPassword(event.target)}>
                                                <svg className="form-group__button-icon">
                                                    <use xlinkHref="#password-pass-icon" />
                                                </svg>
                                            </button> : ''}
                                    </div>
                                );
                            }), 
                            <button key={Object.keys(this.state).length} className="form-group__submit" type="submit" onClick={event => this.hangleSubmitForm(event)}>Изменить</button>]) :
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

RestrePasswordPage.propTypes = {
    getDataOnLoad: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
};

export default RestrePasswordPage;
