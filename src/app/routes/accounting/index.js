import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Accounting = ({match}) => (
    
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/account`}/>
            <Route path={`${match.url}/account`} component={asyncComponent(() => import('./routes/Account'))}/>
            <Route path={`${match.url}/card`} component={asyncComponent(() => import('./routes/Card'))}/>
            <Route path={`${match.url}/salary`} component={asyncComponent(() => import('./routes/Salary'))}/>
            <Route path={`${match.url}/salaryBook`} component={asyncComponent(() => import('./routes/SalaryBook'))}/>
            <Route path={`${match.url}/statement`} component={asyncComponent(() => import('./routes/Statement'))}/>
            <Route path={`${match.url}/vendor`} component={asyncComponent(() => import('./routes/Vendor'))}/>
        </Switch>
    </div>
);

export default Accounting;