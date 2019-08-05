import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';
import ContainerHeader from "components/ContainerHeader";
import GetBranchInfo from 'components/common/GetBranchInfo';

const GetInfoBranch = ({match}) => (
    <div  className="app-wrapper">
       <GetBranchInfo/>
    </div>
);

export default GetInfoBranch;