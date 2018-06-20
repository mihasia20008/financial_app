import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './style.css';

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logout: false
        };

        this.handleCancel = this.handleCancel.bind(this);
    
    }

    handleCancel(event) {
        event.preventDefault();
        localStorage.removeItem('user');
        this.setState({ logout: true });
    }

    render() {
        if (this.state.logout)
            return <Redirect to="/" />;

        return ([
            <div key={0} className="modal">
                <h3 className="modal__title">PIN-код для приложения EasyCosts</h3>
                <button type="button"
                    className="modal__close" 
                    onClick={event => this.handleCancel(event)}>
                    <svg className="modal__close-icon">
                        <use xlinkHref="#close-icon" />
                    </svg>
                </button>
                <div className="modal__content add-bill__step add-bill__step--active">
                    <div className="form-group">
                        <input id={`input-pin`} 
                            name="pin" 
                            className="form-group__input" 
                            type="text"
                            value=""
                            required />
                        <span className="form-group__error">Поле обязательно для заполнения!</span>
                        <label className="form-group__label" htmlFor={`input-pin`}>pin-код</label>
                    </div>
                </div>
                <button className="add-bill__button add-bill__button--submit" 
                    type="button" 
                    onClick={event => this.hangleSubmitForm(event)}>
                    Готово
                </button>
            </div>,
            <div key={1} className="modal__overlay"></div>
        ]);
    }
    
};

export default Modal;
