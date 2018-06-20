import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import './style.css';

class NotFound extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tets: ''
        };
    }

    componentDidMount() {
        this.props.getDataOnLoad({title: '404', headerHidden: true});
    }

    render() {   
        return (
            <div>
                Test
            </div>
        );
    }
}

NotFound.propTypes = {
    getDataOnLoad: PropTypes.func.isRequired
};

export default NotFound;