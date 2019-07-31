import React from "react";
import GetHRCardList from 'components/humanResource/GetHRCardList';
import CardBox from "components/CardBox";
import { connect } from 'react-redux';
import { getHRCardList } from "actions/index";
import ModifyHRCard from 'components/humanResource/ModifyHRCard';

var obj = localStorage.getItem('user');


class HRCardManage extends React.Component{

  constructor(props){
    super(props);
    this.state={
      search:{searchKeyword:null},
      modifyOpen:false
    }   
  }

  handleModifyHRCardOpen = () => {
    
    this.setState({
      modifyOpen:true
    })
  }

  handleModifyHRCardClose = () => {
    this.setState({
      modifyOpen:false
    })
  }
    render(){


        return(
          <div>
           {console.log(this.state)}
          <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
              <GetHRCardList handleModifyHRCardOpen={this.handleModifyHRCardOpen}></GetHRCardList>
          </CardBox>
          <ModifyHRCard open={this.state.modifyOpen} handleModifyHRCardClose={this.handleModifyHRCardClose}/>
            </div>
        );
    }
}
  
 

  export default HRCardManage;
  

 