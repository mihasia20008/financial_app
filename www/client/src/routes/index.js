import React from 'react';
import { Switch } from 'react-router-dom';

import Container from '../containers/Container';
import NotFoundPage from '../containers/NotFoundPage';

import { 
    SignInPage, 
    SignUpPage, 
    ForgotPage, 
    RestorePasswordPage, 
    VerifyPage, 
    NeedConfirmPage } from '../containers/User';

import ActionsPage from '../containers/ActionsPage';
import BillsPage from '../containers/Bills/BillsPage';

export default (
    <Switch>
        <Container exact path="/" component={SignInPage} />
        <Container path="/signup" component={SignUpPage} />
        <Container path="/forgotpassword" component={ForgotPage} />
        <Container path="/restorepassword" component={RestorePasswordPage} />
        <Container path="/verify" component={VerifyPage} />
        <Container path="/needconfirm" component={NeedConfirmPage} />
        <Container path="/actions" privateRoute component={ActionsPage} />
        <Container path="/bills" privateRoute component={BillsPage} />
        <Container component={NotFoundPage} />
    </Switch>
);
