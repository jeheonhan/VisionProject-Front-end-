import React from 'react';
import { connect } from 'react-redux';
import CardBox from 'components/CardBox';
import AddApproval from 'components/approval/AddApproval';
import Button from '@material-ui/core/Button';
import {CallMade} from '@material-ui/icons'



class ApprovalFormList extends React.Component{

    constructor(props) {
        super(props);
      }

    render(){

            return(
            <div>
                <CardBox styleName="col-lg-13" cardStyle="p-1" headerOutside>
                    <AddApproval></AddApproval>
                </CardBox>
                <span style={{float:"right", padding:"20px"}}>
                    <Button variant="contained" color="primary" className="jr-btn jr-btn-lg">
                        <CallMade/>상신
                    </Button>
                </span>
            </div>
        )}
}
const mapStateToProps = ({ approval }) => {
    const {  } = approval;
    return {  }
}

export default connect(mapStateToProps, {  })(ApprovalFormList)