import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';
import ManageCommute from 'components/humanResource/ManageCommute';

const Commute = ({match}) => (
    <div className="app-wrapper">
     <ManageCommute/>
    </div>
);

export default Commute;