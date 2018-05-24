import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

// import './style.css';

class ActionsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tets: ''
        };
    }

    componentDidMount() {
        const { getDataOnLoad, path } = this.props;

        axios.get(`/api?path=${path}`)
            .then(res => getDataOnLoad(res.data))
            .catch(err => console.error(err));
    }

    render() {   
        return (
            <div>
                ActionsPage
            </div>
        );
    }
}

ActionsPage.propTypes = {
    path: PropTypes.string.isRequired,
    getDataOnLoad: PropTypes.func.isRequired
};

export default ActionsPage;
