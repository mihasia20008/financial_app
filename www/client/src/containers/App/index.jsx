import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.css';

import Header from '../../components/Header';
import Menu from '../../components/Menu';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
            menuIsOpen: false,
            headerHidden: false,
            title: 'Загрузка...',
            path: null
        };

        this.handlerToggleMenu = this.handlerToggleMenu.bind(this);
        this.handlerOutsideMenuClick = this.handlerOutsideMenuClick.bind(this);
        this.handlerGetChildData = this.handlerGetChildData.bind(this);
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
        const { component: Chidren } = this.props;
        const { pathname } = this.props.location;        
        const { title, menuIsOpen, headerHidden } = this.state;
		
		return (
			<div className={menuIsOpen ? 'app app--menu-open' : 'app'}>
				<div key={0} className="app__wrap">
					<header className={cx('app__header', {
                        'app__header--hidden': headerHidden
                    })}>
						<Header title={title} headerHidden={headerHidden} menuIsOpen={menuIsOpen} toggleMenu={this.handlerToggleMenu} />
					</header>
					<main className="app__main">
						<Chidren getDataOnLoad={data => this.handlerGetChildData(data)} path={pathname} />
					</main>
				</div>
				<div key={1} className="app__menu" ref={node => { this.node = node; }}>
					<Menu />
				</div>
			</div>
		);
	}
}

App.propTypes = {
	component: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired
};

export default App;
