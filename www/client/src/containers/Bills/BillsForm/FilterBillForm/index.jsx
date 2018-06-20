import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputCheckbox from '../../../../components/Input/InputCheckbox';
import InputRadio from '../../../../components/Input/InputRadio';

class FilterBillForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: props.filters
        };

        this.selectCheckboxItem = this.selectCheckboxItem.bind(this);
        this.selectRadioItem = this.selectRadioItem.bind(this);
    }

    selectRadioItem(target) {
        this.setState(prevState => Object.assign(prevState, {
            filters: Object.assign(prevState.filters, {
                archive: Object.assign(prevState.filters.archive, { value: target.value })
            })
        }));
    }

    selectCheckboxItem(value) {
        let values = this.state.filters.types.value;

        if (values.indexOf(value) !== -1)
            values.splice(values.indexOf(value), 1);
        else 
            values.push(value);

        this.setState(prevState => Object.assign({
            filters: Object.assign(prevState.filters, {
                types: Object.assign(prevState.filters.types, { value: values })
            })
        }));
    }

    render() {
        const { filters } = this.state;

        return (
            <div className="add-bill">
                <div className="add-bill__step add-bill__step--active">
                    <div className="add-bill__step-content">
                        <div className="add-bill__wrap">
                            <h4 className="add-bill__step-title">
                                Выберите необходимые фильтры
                            </h4>
                            {Object.keys(filters).map((filter, index) => {
                                switch (filters[filter].type) {
                                    case 'radio':
                                        return <InputRadio key={index} 
                                            {...filters[filter]}
                                            name={`filter-${index}`} 
                                            onChangeParent={this.selectRadioItem} />;
                                    case 'checkbox':
                                        return (
                                            <div key={index} className="form-group form-group--no-border">
                                                <label className="form-group__label">{filters[filter].label}</label> 
                                                {filters[filter].values.map((item, key) => {                                                    
                                                    return (
                                                        <InputCheckbox key={key} 
                                                            {...item} 
                                                            isActive={filters[filter].value.indexOf(item.value) !== -1} 
                                                            onSelectEvent={this.selectCheckboxItem} />
                                                    );
                                                })}
                                            </div>
                                        );                                        
                                    default: return '';
                                }
                            })}
                        </div>
                        <button className="add-bill__button add-bill__button--submit" 
                                type="button" 
                                onClick={event => this.props.onFilterSelect(event, filters)}>
                            Применить
                        </button>
                    </div>
                </div>
            </div>
        );
    }   
}

FilterBillForm.propTypes = {
    onFilterSelect: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired
};

export default FilterBillForm;
