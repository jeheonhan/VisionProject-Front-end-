import React from 'react';
import { connect } from 'react-redux';
import CardBox from 'components/CardBox';
import AddApproval from 'components/approval/AddApproval';




class ApprovalFormList extends React.Component{

    constructor(props) {
        super(props);
      }

    render(){

            return(
            <div>
                    {this.props.form!==undefined ? <AddApproval formName={this.props.formName} form={this.props.form} formNo={this.props.formNo}/> : ""}

            </div>
        )}
}
const mapStateToProps = ({ approval }) => {
    const {  } = approval;
    return {  }
}

export default connect(mapStateToProps, {  })(ApprovalFormList)