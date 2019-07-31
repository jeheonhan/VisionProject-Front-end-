import React from 'react';
import { connect } from 'react-redux';
import {getApprovalList} from 'actions/Approval'

import Tabs from 'components/approval/Tabs'


class ApprovalFormList extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            searchCondition:"2",
            searchKeyword:JSON.parse(localStorage.getItem("user")).employeeNo
        }
      }

    render(){
        const {approvalList} = this.props;

        if(approvalList===undefined || approvalList===''){
            this.props.getApprovalList(this.state);
            return (<div>&nbsp;&nbsp;LOADING...</div>)
        }

        else
           { 
            return(
            <div className="jr-card">
                <Tabs></Tabs>
            </div>
        )}
    }
}
const mapStateToProps = ({ approval }) => {
    const { approvalList } = approval;
    return { approvalList }
}

export default connect(mapStateToProps, { getApprovalList })(ApprovalFormList)