import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';
import GetEmploteeInfo from 'components/common/GetEmployeeInfo';

const GetInfoEmployee = ({match}) => (
    <div className="app-wrapper">
       <GetEmploteeInfo/>
    </div>
);

export default GetInfoEmployee;