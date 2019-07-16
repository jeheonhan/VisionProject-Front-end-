import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Approval = ({match}) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/approvalBox`}/>
            <Route path={`${match.url}/approvalBox`} component={asyncComponent(() => import('./routes/ApprovalBox'))}/>
            <Route path={`${match.url}/approvalForm`} component={asyncComponent(() => import('./routes/ApprovalForm'))}/>
            <Route path={`${match.url}/approvalRequest`} component={asyncComponent(() => import('./routes/ApprovalRequest'))}/>
        </Switch>
    </div>
);

export default Approval;