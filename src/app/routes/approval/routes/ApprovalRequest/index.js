import React from "react";
import { connect } from 'react-redux';
import { getApprovalFormDetail } from 'actions/index'
import ContainerHeader from "components/ContainerHeader";
import AddApprovalContainer from "containers/approval/AddApprovalContainer"

class ApprovalRequest extends React.Component{
  
  render(){
    const {approvalFormDetail} = this.props;
    const propsForm = this.props.location.state!==undefined ? this.props.location.state.form : (approvalFormDetail !== undefined? approvalFormDetail.approvalForm : undefined);
    const propsFormNo = this.props.location.state!==undefined? this.props.location.state.formNo : "10001";
    const propsFormName = this.props.location.state!==undefined ? this.props.location.state.formName : (approvalFormDetail !== undefined? approvalFormDetail.approvalFormTitle : undefined);

    if(approvalFormDetail===undefined){
      this.props.getApprovalFormDetail(propsFormNo);
    }

    return (
    <div>
      <ContainerHeader title={"결재서 작성"} match={this.props.match}/>
      <AddApprovalContainer form={propsForm} formName={propsFormName} formNo={propsFormNo}/>
     </div> 
  )}

};

  const mapStateToProps = ({approval}) => {
    const {approvalFormDetail} = approval;
    return {approvalFormDetail}
  }

  export default connect ( mapStateToProps, { getApprovalFormDetail })(ApprovalRequest);
  