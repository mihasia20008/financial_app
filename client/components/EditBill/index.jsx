import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog,
    Checkbox, 
    MenuItem, 
    SelectField,
    FlatButton,
    TextField } from 'material-ui';

const style = {
    error: {
        color: '#ef0032',
        fontSize: '16px'
    },
    select: {
        width: '100%'
    },
    checkbox: {
        marginTop: '24px'
    }
};

class EditBill extends Component {
    constructor(props) {
        super(props);

        this.state = {...props.bill};

        this.handleUpdateItem = props.onEditComplete;
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleCheckboxChange() {
        this.setState({ accumulate: !this.state.accumulate });
    }

    handleSelectChange(event, value) {
        (value === 'RUB' || value === 'DOL' || value === 'EUR') ?
            this.setState({ currency: value }) :
            this.setState({ type: value });
    }

    handleChange(event, index, value) {
		(typeof event.target.name !== 'undefined') ?
			this.setState({ [event.target.name]: event.target.value }) :
			this.handleSelectChange(event, value);
    }

    render() {
        const editActions = [
			<FlatButton
				key="0"
			  	label="Изменить"
			  	primary={true}
			  	onClick={() => this.props.onEditComplete(this.state)}
			/>,
			<FlatButton
				key="1"
			  	label="Отменить"
			  	onClick={this.props.onEditCancel}
			/>
        ];
        
        return (
            <Dialog
                title="Редактировать счет"
                actions={editActions}
                modal={true}
                open={this.props.open}
                autoScrollBodyContent={true} >
                <TextField
                    hintText="Мой счет"
                    floatingLabelText="Название"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    fullWidth={true} />
                <br />
                <SelectField
                    className="select-item"
                    floatingLabelText="Тип счета"
                    value={this.state.type}
                    name="type"
                    onChange={this.handleChange} 
                    style={style.select} >
                    <MenuItem value="nal" primaryText="Наличные" />
                    <MenuItem value="card" primaryText="Банковская карта" />
                    <MenuItem value="bill" primaryText="Банковский счет" />
                </SelectField>
                <TextField
                    hintText="10 000"
                    floatingLabelText="Баланс"
                    name="value"
                    value={this.state.value}
                    onChange={this.handleChange}
                    fullWidth={true} />
                <br />
                <SelectField
                    className="select-item"
                    floatingLabelText="Валюта счета"
                    value={this.state.currency}
                    name="currency"
                    onChange={this.handleChange}
                    style={style.select} >
                    <MenuItem value="RUB" primaryText="Рубль, &#8381;" />
                    <MenuItem value="DOL" primaryText="Доллар, $" />
                    <MenuItem value="EUR" primaryText="Евро, &euro;" />
                </SelectField>
                <br />
                <Checkbox
                    label="Счет является накопительным?"
                    checked={this.state.accumulate}
                    onCheck={this.handleCheckboxChange}
                    style={style.checkbox} />
            </Dialog>
        )
    }

}

EditBill.propTypes = {
    bill: PropTypes.object,
    open: PropTypes.bool,
    onEditComplete: PropTypes.func.isRequired,
    onEditCancel: PropTypes.func.isRequired
}

export default EditBill;
