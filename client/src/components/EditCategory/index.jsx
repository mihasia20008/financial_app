import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog,
    Checkbox, 
    FlatButton,
    TextField } from 'material-ui';

const style = {
    error: {
        color: '#ef0032',
        fontSize: '16px'
    },
    checkbox: {
        marginTop: '24px'
    }
};

class EditCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {...props.category};

        this.handleUpdateItem = props.onEditComplete;
        this.handleChange = this.handleChange.bind(this);
        this.handleCostChange = this.handleCostChange.bind(this);
    }

    handleCostChange() {
        this.setState({ cost: !this.state.cost });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
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
                title="Редактировать категорию"
                actions={editActions}
                modal={true}
                open={this.props.open}
                autoScrollBodyContent={true} >
                <TextField
                    hintText="Моя категория"
                    floatingLabelText="Название"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    fullWidth={true} />
                <br />
                <Checkbox
                    label="Расходная категория"
                    checked={this.state.cost}
                    onCheck={this.handleCostChange}
                    style={style.checkbox} />
                <br />
                <Checkbox
                    label="Доходная категория"
                    checked={!this.state.cost}
                    onCheck={this.handleCostChange} />
            </Dialog>
        )
    }
}

EditCategory.propTypes = {
    category: PropTypes.object,
    open: PropTypes.bool,
    onEditComplete: PropTypes.func.isRequired,
    onEditCancel: PropTypes.func.isRequired
}

export default EditCategory;
