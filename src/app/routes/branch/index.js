import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Branch = ({match}) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/addBranch`}/>
            <Route path={`${match.url}/orderRequest`} component={asyncComponent(() => import('./routes/OrderRequest'))}/>
            <Route path={`${match.url}/orderManage`} component={asyncComponent(() => import('./routes/OrderManage'))}/>
        </Switch>
    </div>
);

export default Branch;