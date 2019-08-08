import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';
import ManageCommute from 'components/humanResource/ManageCommute';

const Commute = ({match}) => (
    <div className="app-wrapper">
         {JSON.parse(localStorage.getItem('user')).employeeNo != null ? (
             <ManageCommute/>
            ):(
            <Switch>
                {alert("접근권한이 없습니다.")}
                <Redirect to={`/app/home`}/>
            </Switch> 
            )}
     
    </div>
   
    
);

export default Commute;