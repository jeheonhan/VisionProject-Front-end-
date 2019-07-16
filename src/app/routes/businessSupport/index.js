import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const BusinessSupport = ({match}) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/addBranch`}/>
            <Route path={`${match.url}/addBranch`} component={asyncComponent(() => import('./routes/AddBranch'))}/>
            <Route path={`${match.url}/branch`} component={asyncComponent(() => import('./routes/Branch'))}/>
        </Switch>
    </div>
);

export default BusinessSupport;