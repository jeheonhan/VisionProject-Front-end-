import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const BusinessSupport = ({match}) => (
    <div className="app-wrapper">
        {JSON.parse(localStorage.getItem('user')).accessMenuCodeNo == '04' ||
        JSON.parse(localStorage.getItem('user')).accessMenuCodeNo == '05' ?(
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/addBranch`}/>
                <Route path={`${match.url}/addBranch`} component={asyncComponent(() => import('./routes/AddBranch'))}/>
                <Route path={`${match.url}/branch`} component={asyncComponent(() => import('./routes/Branch'))}/>
            </Switch>
        ):(
            <Switch>
                {alert("접근권한이 없습니다.")}
                <Redirect to={`/app/home`}/>
            </Switch>
        )}
        
    </div>
);

export default BusinessSupport;