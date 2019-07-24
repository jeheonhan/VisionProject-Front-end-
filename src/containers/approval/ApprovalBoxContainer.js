import React from 'react';
import { connect } from 'react-redux';
import {getApprovalFormList} from 'actions/Approval'

import Tabs from 'components/approval/Tabs'


class ApprovalFormList extends React.Component{

    constructor(props) {
        super(props);
      }

    render(){
        const {approvalFormList} = this.props;

        if(approvalFormList===undefined || approvalFormList===''){
            this.props.getApprovalFormList();
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
    const { approvalFormList } = approval;
    return { approvalFormList }
}

export default connect(mapStateToProps, { getApprovalFormList })(ApprovalFormList)