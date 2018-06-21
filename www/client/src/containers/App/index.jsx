import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import cx from 'classnames';

import { getUser, logoutUser } from '../../store/user/actions';

import './style.css';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Overlay from '../../components/Overlay';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
            menuIsOpen: false,
            headerHidden: false,
            filters: false,
            sort: false,
            title: 'Загрузка...',
            path: null
        };

        this.handlerToggleMenu = this.handlerToggleMenu.bind(this);
        this.handlerOutsideMenuClick = this.handlerOutsideMenuClick.bind(this);
        this.handlerGetChildData = this.handlerGetChildData.bind(this);
    }
    
    componentDidMount() {
        const login = localStorage.getItem('user');
        if (login) this.props.getUser(login);
    }

    handlerGetChildData(data) {
        this.setState({...data});
    }

    handlerToggleMenu() {
        if (!this.state.menuIsOpen) {
            document.addEventListener('click', this.handlerOutsideMenuClick, false);
        } else {
            document.removeEventListener('click', this.handlerOutsideMenuClick, false);
        }

        this.setState(prevState => ({menuIsOpen: !prevState.menuIsOpen}));
    }

    handlerOutsideMenuClick(event) {
        if (this.node && this.node.contains(event.target)) {
            return;
        }
        this.handlerToggleMenu();
    }

	render() {
        const { component: Chidren, userId, isFetching, isLogout } = this.props;
        const { pathname } = this.props.location;        
        const { title, menuIsOpen, headerHidden, filters, sort } = this.state;
        
        if (isLogout)
            return <Redirect to="/" />;

		return (
			<div className={menuIsOpen ? 'app app--menu-open' : 'app'}>
				<div key={0} className="app__wrap">
					<header className={cx('app__header', {
                        'app__header--hidden': headerHidden
                    })}>
                        <Header title={title} 
                            filters={filters}
                            sort={sort}
                            menuIsOpen={menuIsOpen} 
                            toggleMenu={this.handlerToggleMenu} />
					</header>
					<main className="app__main">
						<Chidren userId={userId} getDataOnLoad={data => this.handlerGetChildData(data)} path={pathname} />
					</main>
				</div>
				<div key={1} className="app__menu" ref={node => { this.node = node; }}>
					<Menu toggleMenu={this.handlerToggleMenu} callLogout={this.props.logoutUser} />
				</div>
                {isFetching ? <Overlay key={2} /> : ''}
			</div>
		);
	}
}

App.propTypes = {
	component: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    userId: PropTypes.number,
    isFetching: PropTypes.bool.isRequired,
    isLogout: PropTypes.bool.isRequired
};

function mapStateToProps (state) {
    return {
        isFetching: state.bill.isFetching 
            || state.user.isFetching 
            || state.category.isFetching 
            || state.operation.isFetching,
        userId: state.user.id,
        isLogout: state.user.isLogout
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: (login) => dispatch(getUser(login)),
        logoutUser: () => dispatch(logoutUser()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
