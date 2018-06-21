import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './style.css';

class CategoriesPage extends Component {
    componentDidMount() {
        const { getDataOnLoad, path } = this.props;

        axios.get(`/api?path=${path}`)
            .then(res => getDataOnLoad(res.data))
            .catch(err => console.error(err));
    }

    render() {
        const { categories, categoryIds } = this.props;

        return (
            <div className="categories">
            <div  className="categories__item">
                            <div className="category">
                                <span className="category__icon-wrap">
                                    <svg className="category__icon">
                                        <use xlinkHref="#filter-icon" />
                                    </svg>
                                </span>
                                {/* <div className="category__name">
                                    {categories[id].name}
                                </div> */}
                            </div>
                        </div>
                {typeof categoryIds !== 'undefined' ? categoryIds.map((id, index) => {
                    return (
                        <div key={index} className="categories__item">
                            <div className="category">
                                <span className="category__icon-wrap">
                                    <svg className="category__icon">
                                        <use xlinkHref={categories[id].icon} />
                                    </svg>
                                </span>
                                <div className="category__name">
                                    {categories[id].name}
                                </div>
                            </div>
                        </div>
                    );
                }) : ''}
            </div>
        );
    }   
}

function mapStateToProps(state) {
    return {
        categories: state.category.categories,
        categoryIds: state.category.categoryIds
    };
}

export default connect(
    mapStateToProps
)(CategoriesPage);
