import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';
import ContainerHeader from "components/ContainerHeader";

const GetInfoBranch = ({match}) => (
    <div >
       <ContainerHeader title={"내정보보기"} match={match}/>
    </div>
);

export default GetInfoBranch;