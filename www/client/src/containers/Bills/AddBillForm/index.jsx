import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import axios from 'axios';

import * as billActions from '../../../store/bill/actions';
import { formatNumber } from '../../../helpers';

import './style.css';

import Input from '../../../components/Input';

class AddBillForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
            main: {
                name: {
                    value: '',
                    label: 'Название',
                    type: 'text',
                    onBlurEvent: target => this.handleInputBlur(target),
                    onChangeEvent: target => this.handleInputMainChange(target)
                },
                type: {
                    value: '',
                    label: 'Тип',
                    type: 'radio',
                    onBlurEvent: target => this.handleInputBlur(target),
                    onChangeEvent: target => this.handleInputMainChange(target),
                    view: 1,
                    values: [
                        {
                            value: '0',
                            label: 'Наличные'
                        },
                        {
                            value: '1',
                            label: 'Банковская карта'
                        },
                    ]
                },
                currency: {
                    value: '',
                    label: 'Валюта',
                    type: 'radio',
                    onBlurEvent: target => this.handleInputBlur(target),
                    onChangeEvent: target => this.handleInputMainChange(target),
                    values: [
                        {
                            value: '0',
                            label: 'RUB'
                        },
                        {
                            value: '1',
                            label: 'USD'
                        },
                        {
                            value: '2',
                            label: 'EUR'
                        },
                    ]
                },
                value: {
                    value: '',
                    label: 'Баланс',
                    type: 'text',
                    onBlurEvent: target => this.handleInputBlur(target),
                    onChangeEvent: target => this.handleInputMainChange(target)
                },
            },
            sub: {
                limit: {
                    show: false,
                    value: '',
                    label: 'Лимит карты',
                    type: 'text',
                    onBlurEvent: target => this.handleInputBlur(target),
                    onChangeEvent: target => this.handleInputSubChange(target)
                },
                number: {
                    show: false,
                    value: '',
                    label: 'Последние 4 цифры',
                    type: 'text',
                    onBlurEvent: target => this.handleInputBlur(target),
                    onChangeEvent: target => this.handleInputSubChange(target)
                },
                accumulate: {
                    show: true,
                    value: '0',
                    label: 'Накопительный?',
                    type: 'radio',
                    onBlurEvent: target => this.handleInputBlur(target),
                    onChangeEvent: target => this.handleInputSubChange(target),
                    values: [
                        {
                            value: '0',
                            label: 'Нет'
                        },
                        {
                            value: '1',
                            label: 'Да'
                        },
                    ]
                },
                consider: {
                    show: true,
                    value: '1',
                    label: 'Учитывать в балансе?',
                    type: 'radio',
                    onBlurEvent: target => this.handleInputBlur(target),
                    onChangeEvent: target => this.handleInputSubChange(target),
                    values: [
                        {
                            value: '0',
                            label: 'Нет'
                        },
                        {
                            value: '1',
                            label: 'Да'
                        },
                    ]
                },
            }
        };

        this.showNextTab = this.showNextTab.bind(this);
        this.showThisTab = this.showThisTab.bind(this);

        this.handleInputMainChange = this.handleInputMainChange.bind(this);
        this.handleInputSubChange = this.handleInputSubChange.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    componentDidMount() {
        const { getDataOnLoad, path, isModal } = this.props;

        if (typeof isModal === 'undefined' || !isModal) 
            axios.get(`/api?path=${path}`)
                .then(res => getDataOnLoad(res.data))
                .catch(err => console.error(err));
    }

    handleInputBlur(target) {
        let input = target.getAttribute('name'); 
        const formGoup = target.closest('.form-group');        
        switch (input) {
            case 'type':
            case 'currency':
                if (this.state.main[input].value === '') {
                    formGoup.classList.add('form-group--error');
                    formGoup.classList.remove('form-group--success');  
                    formGoup.querySelector('.form-group__error').innerText = 'Поле обязательно для заполнения!';
                } else {
                    target.closest('.form-group').classList.remove('form-group--error');
                    target.closest('.form-group').classList.add('form-group--success');     
                } 
                break;
            default:
                if (target.value === '') {
                    formGoup.classList.add('form-group--error');
                    formGoup.classList.remove('form-group--success');  
                    formGoup.querySelector('.form-group__error').innerText = 'Поле обязательно для заполнения!';
                } else {
                    target.closest('.form-group').classList.remove('form-group--error');
                    target.closest('.form-group').classList.add('form-group--success');     
                } 
                break;
        }
          
    }

    handleInputMainChange(target) {
        let { value } = target;
        const input = target.getAttribute('name');        
        
        if (target.closest('.form-group').classList.contains('form-group--error') && value !== '')
            target.closest('.form-group').classList.remove('form-group--error');  
        

        if (input === 'type')
            this.handleInputTypeChange(target);

        if (input === 'value') {
            value = formatNumber(value.replace(/\D/g, ''));
        }

        this.setState(prevState => Object.assign(prevState, 
            Object.assign(prevState.main, {
                [`${input}`]: Object.assign(prevState.main[input], { value })
            })
        ));
    }

    handleInputSubChange(target) {
        let { value } = target;
        const input = target.getAttribute('name');        
        
        if (target.closest('.form-group').classList.contains('form-group--error') && value !== '')
            target.closest('.form-group').classList.remove('form-group--error');  
        
        if (input === 'limit') {
            value = formatNumber(value.replace(/\D/g, ''));
        }

        if (input === 'number') {
            value = value.replace(/\D/g, '').substr(0, 4);
        }

        this.setState(prevState => Object.assign(prevState, 
            Object.assign(prevState.sub, {
                [`${input}`]: Object.assign(prevState.sub[input], { value })
            })
        ));
    }

    handleInputTypeChange(target) {
        switch (target.value) {
            case '1':                
                this.setState(prevState => Object.assign(prevState, {
                    sub: Object.assign(prevState.sub, {
                        number: Object.assign(prevState.sub.number, { show: true }),
                        limit: Object.assign(prevState.sub.limit, { show: true }),
                    })
                }));
                break;
            default:
                this.setState(prevState => Object.assign(prevState, {
                    sub: Object.assign(prevState.sub, {
                        number: Object.assign(prevState.sub.number, { show: false }),
                        limit: Object.assign(prevState.sub.limit, { show: false }),
                    })
                }));
        }
    }

    handleSubmitForm(event) {
        event.preventDefault();

        let data = {};
        for (let item in this.state.main) {
            const inputElement = document.querySelector(`input[name=${item}`);        
            this.handleInputBlur(inputElement);  
            data[item] = item === 'value' ?
                this.state.main[item].value.replace(/\D/g, '') :
                this.state.main[item].value;
        }
        for (let item in this.state.sub) {
            if (!this.state.sub[item].show) continue;
            const inputElement = document.querySelector(`input[name=${item}`);        
            this.handleInputBlur(inputElement);  
            data[item] = item === 'limit' ?
                this.state.sub[item].value.replace(/\D/g, '') :
                this.state.sub[item].value;
        }


        
        if (!document.querySelectorAll('.form-group--error').length) {
            data.user = this.props.userId;
            console.log(data);
            this.props.dispatch(billActions.addBill(data));
            // axios.post('/api/signup', data)
            //     .then(res => {
            //         if (res.status !== 201) {
            //             global.alert('Ошибка регистрации пользователя!');
            //             return;
            //         }
            //         this.setState({isSignUp: true});
            //     })
            //     .catch(err => {
            //         global.alert(`Ошибка сервера. \n${err.response.data.code}: ${err.response.data.info} \n\nРазработчики уже усправляют эту проблему.`);
            //         err.response.data.errors.map(error => console.error(error.message));
            //     });
        }
    }

    showNextTab() {
        for (let item in this.state.main) {
            const inputElement = document.querySelector(`input[name=${item}`);        
            this.handleInputBlur(inputElement);
        }
        if (!document.querySelectorAll('.form-group--error').length)
            this.setState({activeTab: this.state.activeTab + 1});
    }

    showThisTab(tab) {
        if (tab !== this.state.activeTab)
            this.setState({activeTab: tab});
    }

    render() {
        const { activeTab } = this.state;
        return (
            <div className="add-bill">
                <div className={cx("add-bill__step", {
                    'add-bill__step--show': activeTab > 0,
                    'add-bill__step--active': activeTab === 0
                })} onClick={() => this.showThisTab(0)}>
                    <h4 className="add-bill__step-title">
                        Основная информация
                    </h4>
                    <div className="add-bill__step-content">
                        <div className="add-bill__wrap">
                            {Object.keys(this.state.main).map((item, index) => {
                                return <Input key={index} name={item} {...this.state.main[item]} />
                            })}
                        </div>
                        <button className="add-bill__button add-bill__button--next" type="button" onClick={this.showNextTab}>
                            Далее
                        </button>
                    </div>
                </div>
                <div className={cx("add-bill__step", {
                    'add-bill__step--active': activeTab > 0
                })}>
                    <h4 className="add-bill__step-title">
                        Дополнительная информация
                    </h4>
                    <div className="add-bill__step-content">
                        <div className="add-bill__wrap">
                            {Object.keys(this.state.sub).map((item, index) => {
                                return this.state.sub[item].show ? <Input key={index} name={item} {...this.state.sub[item]} /> : '';
                            })}
                        </div>
                        <button className="add-bill__button add-bill__button--submit" 
                            type="button" 
                            onClick={event => this.handleSubmitForm(event)}>
                            Готово
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

AddBillForm.propTypes = {
    getDataOnLoad: PropTypes.func,
    path: PropTypes.string,
    isModal: PropTypes.bool,
    userId: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {    
    return {
        userId: state.user.id
    };
}

export default connect(mapStateToProps)(AddBillForm);
