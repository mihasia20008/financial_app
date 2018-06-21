import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputCheckbox from '../../../../components/Input/InputCheckbox';

class SortBillForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSort: props.activeSort
        };

        this.selectSort = this.selectSort.bind(this);
    }

    selectSort(value) {
        this.setState({ activeSort: value });
    }

    render() {
        const { onSortSelect } = this.props;
        const { activeSort } = this.state;

        const sorts = [
            {
                value: 'create-up',
                label: 'Сначала новые'
            },
            {
                value: 'create-down',
                label: 'Сначала старые'
            },
            {
                value: 'balance-up',
                label: 'По возрастанию баланса'
            },
            {
                value: 'balance-down',
                label: 'По убыванию баланса'
            },
            {
                value: 'abc',
                label: 'По алфавиту'
            },
        ];

        return (
            <div className="add-bill">
                <div className="add-bill__step add-bill__step--active">
                    <h4 className="add-bill__step-title">
                        Выберите вариант сортировки
                    </h4>
                    <div className="add-bill__step-content">
                        <div className="add-bill__wrap">
                            {sorts.map((sort, index) => <InputCheckbox key={index} 
                                                            {...sort} 
                                                            isActive={sort.value === activeSort} 
                                                            onSelectEvent={this.selectSort} />)}
                        </div>
                        <button className="add-bill__button add-bill__button--submit" 
                                type="button" 
                                onClick={event => onSortSelect(event, activeSort)}>
                            Применить
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

SortBillForm.propTypes = {
    activeSort: PropTypes.string.isRequired,
    onSortSelect: PropTypes.func.isRequired
};

export default SortBillForm;
