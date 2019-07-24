import React from "react";
import ContainerHeader from "components/ContainerHeader";
import AddApprovalContainer from "containers/approval/AddApprovalContainer"

class ApprovalRequest extends React.Component{
  
  render(){
    const propsFormNo = this.props.location.state!==undefined ? this.props.location.state.formNo : "";

    return (
    <div>
      <ContainerHeader title={"결재서 작성"} match={this.props.match}/>
      <AddApprovalContainer formNo={this.propsFormNo}/>
     </div> 
  )}

};

  export default ApprovalRequest;
  