import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Home = ({match}) => (
    <div >
       <video src={require("assets/videos/stoneVision.mp4")} autoPlay="autoPlay" muted="muted"
        width="100%" height=""/>
    </div>
);

export default Home;