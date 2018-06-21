import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import axios from 'axios';

import { addOperation } from '../../../../store/operation/actions';
import { formatNumber } from '../../../../helpers';

import './style.css';

import Input from '../../../../components/Input';

class AddActionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
            main: {
                bill: {
                    value: '',
                    fake: '',
                    label: 'Cчет',
                    type: 'select',
                    onBlurEvent: target => this.handleInputBlur(target),
                    onChangeEvent: target => this.handleInputMainChange(target)
                },
                amount: {
                    value: '',
                    label: 'Сумма',
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
                    values: [
                        {
                            value: '0',
                            label: 'Доход'
                        },
                        {
                            value: '1',
                            label: 'Расход'
                        },
                    ]
                },
                comment: {
                    value: '',
                    label: 'Комментарий',
                    type: 'text',
                    onBlurEvent: target => this.handleInputBlur(target),
                    onChangeEvent: target => this.handleInputMainChange(target)
                },
            },
            sub: {
                retry: {
                    show: true,
                    value: '0',
                    label: 'Повторять?',
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
                date: {
                    show: true,
                    value: '',
                    label: 'Дата',
                    type: 'text',
                    onBlurEvent: target => this.handleInputBlur(target),
                    onChangeEvent: target => this.handleInputSubChange(target)
                },
                origin: {
                    show: false,
                    value: '',
                    label: 'Место получения',
                    type: 'text',
                    onBlurEvent: target => this.handleInputBlur(target),
                    onChangeEvent: target => this.handleInputSubChange(target)
                },
                place: {
                    show: false,
                    value: '',
                    label: 'Место совершения',
                    type: 'text',
                    onBlurEvent: target => this.handleInputBlur(target),
                    onChangeEvent: target => this.handleInputSubChange(target)
                },
            }
        };

        this.showNextTab = this.showNextTab.bind(this);
        this.showThisTab = this.showThisTab.bind(this);

        this.handleInputMainChange = this.handleInputMainChange.bind(this);
        this.handleInputSubChange = this.handleInputSubChange.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleInputSelectBlur = this.handleInputSelectBlur.bind(this);
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
        console.log(target);
        
        if (typeof target.name !== 'undefined' && target.name === 'bill') {
            this.handleInputSelectBlur(target);
            return;
        }
        let input = target.getAttribute('name'); 
        const formGoup = target.closest('.form-group');        
        switch (input) {
            case 'bill':
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

    handleInputSelectBlur(target) {
        const formGoup = document.querySelector(`input[name=${target.name}]`).closest('.form-group'); 

        if (target.id === -1) {
            formGoup.classList.add('form-group--error');
            formGoup.classList.remove('form-group--success');  
            formGoup.querySelector('.form-group__error').innerText = 'Поле обязательно для заполнения!';
        } else if (target.id === -2) {
            this.setState(prevState => Object.assign(prevState, {
                main: Object.assign(prevState.main, {
                    [`${target.name}`]: Object.assign(prevState.main[target.name], {
                        value: '',
                        fake: target.value,
                    })
                })
            }));
            formGoup.classList.remove('form-group--error');
            formGoup.classList.remove('form-group--success');  
            formGoup.querySelector('.form-group__error').innerText = '';
        } else {
            this.setState(prevState => Object.assign(prevState, {
                main: Object.assign(prevState.main, {
                    [`${target.name}`]: Object.assign(prevState.main[target.name], {
                        value: target.id,
                        fake: target.value
                    })
                })
            }));
            formGoup.classList.remove('form-group--error');
            formGoup.classList.add('form-group--success');
        }
    }

    handleInputMainChange(target) {
        let { value } = target;
        const input = target.getAttribute('name');        
        
        if (target.closest('.form-group').classList.contains('form-group--error') && value !== '')
            target.closest('.form-group').classList.remove('form-group--error');  
        

        if (input === 'type')
            this.handleInputTypeChange(target);

        if (input === 'amount') {
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

        if (input === 'date') {
            const matrix = "____-__-__";
            let i = 0,
                def = matrix.replace(/\D/g, ""),
                val = value.replace(/\D/g, "");
            if (def.length >= val.length) val = def;
            value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
            });
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
                        origin: Object.assign(prevState.sub.origin, { show: true }),
                        place: Object.assign(prevState.sub.place    , { show: false }),
                    })
                }));
                break;
            default:
                this.setState(prevState => Object.assign(prevState, {
                    sub: Object.assign(prevState.sub, {
                        origin: Object.assign(prevState.sub.origin, { show: false }),
                        place: Object.assign(prevState.sub.place, { show: true }),
                    })
                }));
        }
    }

    handleSubmitForm(event) {
        event.preventDefault();

        let data = {};
        for (let item in this.state.main) { 
            data[item] = item === 'amount' ?
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
            data.category = 1;
            this.props.dispatch(addOperation(data));
        }
    }

    showNextTab() {
        for (let item in this.state.main) {
            if (item === 'bill') continue;
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
                                return <Input key={index} name={item} {...this.state.main[item]} />;
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

AddActionForm.propTypes = {
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

export default connect(mapStateToProps)(AddActionForm);
