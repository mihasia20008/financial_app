import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class SignUpPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastname: {
                value: '',
                label: 'Фамилия',
                icon: '#user-icon',
                onBlur: target => this.hangleInputBlur(target),
                onChange: target => this.hangleInputChange(target)
            },
            firstname: {
                value: '',
                label: 'Имя',
                icon: '#user-icon',
                onBlur: target => this.hangleInputBlur(target),
                onChange: target => this.hangleInputChange(target)
            },
            login: {
                value: '',
                label: 'Логин',
                icon: '#user-icon',
                onBlur: target => this.hangleInputBlur(target),
                onChange: target => this.hangleInputChange(target)
            },
            email: {
                value: '',
                label: 'Электронная почта',
                icon: '#email-icon',
                onBlur: target => this.hangleInputBlur(target),
                onChange: target => this.hangleInputChange(target)
            },
            phone: {
                value: '',
                label: 'Номер телефона',
                icon: '#phone-icon',
                onBlur: target => this.hangleInputBlur(target),
                onChange: target => this.hangleInputChange(target)
            },
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
            },
            // currency: 1,
            // language: 1
        };

        this.hangleInputEmailBlur = this.hangleInputEmailBlur.bind(this);
        this.hangleInputPhoneBlur = this.hangleInputPhoneBlur.bind(this);
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
    }

    hangleInputBlur(target) {
        switch (target.getAttribute('name')) {
            case 'login':
                this.hangleInputLoginBlur(target);
                break;
            case 'email':
                this.hangleInputEmailBlur(target);
                break;
            case 'phone':
                this.hangleInputPhoneBlur(target);
                break;
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
                const formGoup = target.closest('.form-group');
                if (target.value === '') {
                    formGoup.classList.add('form-group--error');
                    formGoup.classList.remove('form-group--success');  
                    formGoup.querySelector('.form-group__error').innerText = 'Поле обязательно для заполнения!';
                } else if (target.value.length < 2) {
                    formGoup.classList.add('form-group--error');
                    formGoup.classList.remove('form-group--success');  
                    formGoup.querySelector('.form-group__error').innerText = 'Введено слишком короткое значение!';
                } else {
                    target.closest('.form-group').classList.remove('form-group--error');
                    target.closest('.form-group').classList.add('form-group--success');     
                } 
                break;
        }
          
    }

    hangleInputChange(target) {
        if (target.closest('.form-group').classList.contains('form-group--error') && target.value !== '')
            target.closest('.form-group').classList.remove('form-group--error');  
        
        let { value } = target;
        const input = target.getAttribute('name');

        if (input === 'phone') {
            const matrix = "+7 (___) ___ __ __";
            let i = 0,
                def = matrix.replace(/\D/g, ""),
                val = value.replace(/\D/g, "");
            if (def.length >= val.length) val = def;
            value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
            });
        }

        this.setState(prevState => Object.assign(prevState, {
            [`${input}`]: Object.assign(prevState[input], { value })
        }));
    }

    hangleInputLoginBlur(target) {
        const formGoup = target.closest('.form-group');
        if (target.value === '') {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');  
            formGoup.querySelector('.form-group__error').innerText = 'Поле обязательно для заполнения!';
        } else if (target.value.length < 2) {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');  
            formGoup.querySelector('.form-group__error').innerText = 'Введено слишком короткое значение!';
        } else {
            axios.get(`/api/checkdata?param=login&value=${target.value.toLowerCase()}`)
                .then(res => {
                    if (res.data.result > 0) {
                        formGoup.classList.add('form-group--error');
                        formGoup.classList.remove('form-group--success');  
                        formGoup.querySelector('.form-group__error').innerText = 'Пользователь с таким логином уже существует!'; 
                    } else {
                        formGoup.classList.remove('form-group--error'); 
                        formGoup.classList.add('form-group--success');  
                    }
                })
                .catch(err => console.log(err));  
        } 
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
                    if (res.data.result > 0) {
                        formGoup.classList.add('form-group--error');
                        formGoup.classList.remove('form-group--success');  
                        formGoup.querySelector('.form-group__error').innerText = 'Пользователь с таким E-Mail уже существует!'; 
                    } else {
                        formGoup.classList.remove('form-group--error'); 
                        formGoup.classList.add('form-group--success');  
                    }
                })
                .catch(err => console.log(err));
        }
    }

    hangleInputPhoneBlur(target) {
        const formGoup = target.closest('.form-group');
        if (target.value === '+7' || target.value === '') {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');  
            formGoup.querySelector('.form-group__error').innerText = 'Поле обязательно для заполнения!';
            this.setState(prevState => Object.assign(prevState, {
                phone: Object.assign(prevState.phone, { value: '' })
            }));
        } else if (target.value.replace(/\s+|\(|\)/g, '').length < 11) {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');  
            formGoup.querySelector('.form-group__error').innerText = 'Введен неверный номер телефона!';    
        } else if (target.value.replace(/\s+|\+|\(|\)/g, '')[1] !== '9') {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');  
            formGoup.querySelector('.form-group__error').innerText = 'Номер телефона должен начинаться с 9!';            
        } else {
            axios.get(`/api/checkdata?param=phone&value=${target.value.replace(/\s+|\+|\(|\)/g, '')}`)
                .then(res => {
                    if (res.data.result > 0) {
                        formGoup.classList.add('form-group--error');
                        formGoup.classList.remove('form-group--success');  
                        formGoup.querySelector('.form-group__error').innerText = 'Пользователь с таким номером телефона уже существует!'; 
                    } else {
                        formGoup.classList.remove('form-group--error'); 
                        formGoup.classList.add('form-group--success');  
                    }
                })
                .catch(err => console.log(err));
        }
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

        data.phone = data.phone.replace(/\s+|\+|\(|\)/g, '');
        data.language = 1;
        data.currency = 1;
        
        if (!document.querySelectorAll('.form-group--error').length) {
            axios.post('/api/signup', data)
                .then(res => {
                    if (res.status !== 201) {
                        global.alert('Ошибка регистрации пользователя!');
                        return;
                    }
                    this.setState({isSignUp: true});
                })
                .catch(err => {
                    global.alert(`Ошибка сервера. \n${err.response.data.code}: ${err.response.data.info} \n\nРазработчики уже усправляют эту проблему.`);
                    err.response.data.errors.map(error => console.error(error.message));
                });
        }
    }

    render() {
        const { isSignUp } = this.state;

        if (localStorage.getItem('user'))
            return <Redirect to={{ pathname: '/actions' }} />;

        if (typeof isSignUp !== 'undefined')
            return <Redirect to={{ pathname: '/needconfirm' }} />;

        return (
            <div className="auth-page">
                <div className="auth-page__wrap">
                    <svg className="auth-page__icon">
                        <use xlinkHref="#app-icon" />
                    </svg>
                    <h1 className="auth-page__title">EasyCosts</h1>
                    <p className="auth-page__text">
                        Заполните следующие поля для завершения регистрации
                    </p>
                    <form className="auth-page__form" action="">
                        {Object.keys(this.state).map((item, index) => {
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
                        })}
                        <button className="form-group__submit" type="submit" onClick={event => this.hangleSubmitForm(event)}>Создать</button>
                        <div className="form-group__links">
                            <Link className="form-group__links-item" to="/">
                                Вход в систему
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

SignUpPage.propTypes = {
    getDataOnLoad: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
};

export default SignUpPage;
