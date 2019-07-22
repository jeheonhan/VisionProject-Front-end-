import React from 'react';
import { connect } from 'react-redux';
import CardBox from 'components/CardBox';
import {getApprovalFormList} from 'actions/Approval'
import ApprovalFormTable from 'components/approvalForm/ApprovalFormTable'
import AddApprovalForm from 'components/approvalForm/AddApprovalForm'


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
            <div>
                {approvalFormList !== undefined ? (<CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside><ApprovalFormTable></ApprovalFormTable></CardBox>):""}
                <div align="right">
                 <AddApprovalForm></AddApprovalForm>
                </div>
            </div>
        )}
    }
}
const mapStateToProps = ({ approval }) => {
    const { approvalFormList } = approval;
    return { approvalFormList }
}

export default connect(mapStateToProps, { getApprovalFormList })(ApprovalFormList)