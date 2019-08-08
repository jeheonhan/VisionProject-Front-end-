import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const ProductionManagement = ({match}) => (
    <div className="app-wrapper">
        {JSON.parse(localStorage.getItem('user')).accessMenuCodeNo == '03' ||
        JSON.parse(localStorage.getItem('user')).accessMenuCodeNo == '05' ? 
        (
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/orderFromBranch`}/>
            <Route path={`${match.url}/orderFromBranch`} component={asyncComponent(() => import('./routes/OrderFromBranch'))}/>
            <Route path={`${match.url}/orderToVendor`} component={asyncComponent(() => import('./routes/OrderToVendor'))}/>
            <Route path={`${match.url}/product`} component={asyncComponent(() => import('./routes/Product'))}/>
        </Switch>
        ):(
        <Switch>
            {alert("접근권한이 없습니다.")}
            <Redirect to={`/app/home`}/>
        </Switch>
        )}
       
    </div>
);

export default ProductionManagement;