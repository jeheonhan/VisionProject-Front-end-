import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

let boo = false;

class Home extends React.Component{
    constructor(props){
        super(props);
    }
    
    handleBoo = () => {
        if(boo){
            boo=false
        }else{
            boo=true
        }
    }

    render(){
        return(
            <div>
                {this.handleBoo()}
               {boo ? <video src={require("assets/videos/lastVision.mp4")} autoPlay="autoPlay" muted="muted"
                width="100%" height=""/>
                :<video src={require("assets/videos/blackVision.mp4")} autoPlay="autoPlay" muted="muted"
                width="100%" height=""/>}
            </div>
        );
    }
}
// const Home = ({match}) => {
//     return(
//         <div>
//            <video src={require("assets/videos/lastVision.mp4")} autoPlay="autoPlay" muted="muted"
//             width="100%" height=""/>
//         </div>
//     );
// }

export default Home;