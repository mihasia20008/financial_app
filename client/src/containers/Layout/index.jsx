import React, { Component } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';

import { MuiThemeProvider, Divider, Drawer, MenuItem } from 'material-ui';

import RegistrationPage from '../../components/RegistrationPage';
import LoginPage from '../../components/LoginPage';

import ActionsPage from '../../components/ActionsPage';
import BillsPage from '../../components/BillsPage';
import CategoriesPage from '../../components/CategoriesPage';

import AddBill from '../../components/AddBill';
import AddCaterogy from '../../components/AddCategory';

import PrivateRoute from '../../components/PrivateRoute';
// import PropsRoute from '../../components/PropsRoute';

const style = {
    activeLink: {
        fontWeight: 'bold',
        color: 'red',
    },
    link: {
        textDecoration: 'none'
    }
};

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleToggleMenu = this.handleToggleMenu.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleToggleMenu() { 
        this.setState({ open: !this.state.open });
    }

    handleLogout() {
        localStorage.removeItem('userId');
        sessionStorage.removeItem('userPin');
    }

    render() {
        return (
            <MuiThemeProvider>
                <div> 
                    <Switch>
                        <Route exact path="/" render={routeProps => {		
                            return (
                                <Redirect to={{ 
                                    pathname: "/actions", 
                                    state: { from: routeProps.location } 
                                }} />
                            );
                        }}/>
                        <PrivateRoute path="/actions" 
                            redirectTo="/login"
                            component={ActionsPage} 
                            onToggleMenuClick={this.handleToggleMenu} />
                        <PrivateRoute path="/bills/add" 
                            redirectTo="/login"
                            component={AddBill} 
                            onToggleMenuClick={this.handleToggleMenu} />
                        <PrivateRoute path="/bills" 
                            redirectTo="/login"
                            component={BillsPage} 
                            onToggleMenuClick={this.handleToggleMenu} />
                        <PrivateRoute path="/categories/add" 
                            redirectTo="/login"
                            component={AddCaterogy} 
                            onToggleMenuClick={this.handleToggleMenu} />
                        <PrivateRoute path="/categories" 
                            redirectTo="/login"
                            component={CategoriesPage} 
                            onToggleMenuClick={this.handleToggleMenu} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/signup" component={RegistrationPage} />
                    </Switch>
                    <Drawer
                        docked={false}
                        width={256}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})} >
                        <NavLink to="/bills" 
                            activeStyle={style.activeLink}
                            style={style.link} >
                            <MenuItem onClick={this.handleToggleMenu}>    
                                Счета
                            </MenuItem>
                        </NavLink>
                        <NavLink to="/actions" 
                            activeStyle={style.activeLink}
                            style={style.link} >
                            <MenuItem onClick={this.handleToggleMenu}>    
                                История
                            </MenuItem>
                        </NavLink>
                        <NavLink to="/categories" 
                            activeStyle={style.activeLink}
                            style={style.link} >
                            <MenuItem onClick={this.handleToggleMenu}>    
                                Категории
                            </MenuItem>
                        </NavLink>
                        <NavLink to="/statistics" 
                            activeStyle={style.activeLink}
                            style={style.link} >
                            <MenuItem onClick={this.handleToggleMenu}>    
                                Статистика
                            </MenuItem>
                        </NavLink>
                        <Divider />
                        <NavLink to="/personal" 
                            activeStyle={style.activeLink}
                            style={style.link} >
                            <MenuItem onClick={this.handleToggleMenu}>    
                                Личный кабинет
                            </MenuItem>
                        </NavLink>
                        <NavLink to="/login" 
                            onClick={this.handleLogout}
                            activeStyle={style.activeLink}
                            style={style.link} >
                            <MenuItem onClick={this.handleToggleMenu}>    
                                Выход
                            </MenuItem>
                        </NavLink>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Layout;
