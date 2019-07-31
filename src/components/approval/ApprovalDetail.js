import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardBox from 'components/CardBox';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import Approver from './approver';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class FullScreenDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            approvalDetail : this.props.approvalDetail
            //  approvalTitle:this.props.approvalDetail.approvalTitle
            // ,approvalContent:this.props.approvalDetail.approvalContent
            // ,firstApprover:this.props.approvalDetail.firstApprover
            // ,secondApprover:this.props.approvalDetail.secondApprover
            // ,thirdApprover:this.props.approvalDetail.thirdApprover
            // ,fourthApprover:this.props.approvalDetail.fourthApprover
            // ,fifthApprover:this.props.approvalDetail.fifthApprover
            // ,totalApproverCount:this.props.approvalDetail.totalApproverCount
            // ,open:false
        }
    }


  render() {
      console.log(this.props.approvalDetail)
      if(this.props.approvalDetail.firstApprover===undefined){
          return(<div></div>)
      }
      if(this.props.approvalDetail!==this.state.approvalDetail){
          this.setState({
              approvalDetail : this.props.approvalDetail
          })
      }
        return (
            <div>
              <Dialog
                maxWidth="xl"
                open={this.props.open}
                onClose={this.handleRequestClose}
                TransitionComponent={Transition}
              >
                <AppBar className="position-relative" style={{backgroundColor:"#CC4F3A", height:"40px", padding:"5px"}}>
                    <div><IconButton onClick={this.props.handleClose} aria-label="Close" size="small">
                      <CloseIcon/>
                    </IconButton>
                      결재서 상세조회
                      </div>
                </AppBar>
                <div>
                <span style={{float:"left", paddingLeft:"10px", marginTop:"25px"}}>
                <TextField
                      error
                      id="outlined-required"
                      label="결재서제목"
                      value={this.state.approvalDetail.approvalTitle}
                      margin="normal"
                  />
                <TextField 
                    style={{width:"100px"}}
                    id="registrantEmployeeName"
                    label="작성일자"
                    value={this.state.approvalDetail.submitDate}
                    margin="normal"

                />
                      </span>
                      
                      <span style={{float:"right", marginLeft:"5px", marginRight:"10px", marginTop:"5px"}}>
                     
                      <Approver arr={[this.state.approvalDetail.firstApprover, this.state.approvalDetail.secondApprover, this.state.approvalDetail.thirdApprover, this.state.approvalDetail.fourthApprover, this.state.approvalDetail.fifthApprover]}/>
                      </span>
                      
                  </div>
                  <div style={{padding:"50px"}} dangerouslySetInnerHTML={{__html:this.state.approvalDetail.approvalContent}}/>
              </Dialog>
            </div>
          );
    
  }


}

const mapStateToProps = ({approval}) => {
    const {} = approval;
    return {};
}

export default connect(mapStateToProps, {}) (FullScreenDialog);
