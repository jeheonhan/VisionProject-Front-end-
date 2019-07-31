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
import Button from '@material-ui/core/Button';
import {CheckCircle, Clear} from '@material-ui/icons';
import SweetAlert from 'react-bootstrap-sweetalert'
import {modifyApprovalStatus} from 'actions/index'
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';


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
             ,open:false
        }
    }


  handleOK = () => {
    this.setState({
      open:true,
      text:"승인"
    })
  }

  handleReject = () => {
    this.setState({
      open:true,
      text:"반려"
    })
  }

  onConfirm = () => {
    const employeeNo = JSON.parse(localStorage.getItem("user")).employeeNo;
    const approvalOrReturn = this.state.text==="승인" ? "approval" : "return";
    const _url = this.state.approvalDetail.approvalNo+"/"+employeeNo+"/"+approvalOrReturn
    this.props.modifyApprovalStatus(_url, employeeNo);

    this.setState({
      open:false
    });

    this.props.handleClose();
  };

  onCancel = () => {
    this.setState({
      open:false
    })
  };

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
                <div style={{position:"fixed", 
                              
                              right:"14%", /* 창에서 오른쪽 길이 */ 
                              top:"88%", /* 창에서 위에서 부터의 높이 */ 
                              backgroundColor: "transparent", 
                              margin:0, 
                              zIndex:10000}}>
                  
                           <Button onClick={this.handleOK} style={{width:"150px"}} variant="contained" color="secondary" className="jr-btn">
                            <CheckCircle/>
                            <span>결재</span>
                          </Button>
                          <Button onClick={this.handleReject} style={{width:"150px"}} variant="contained" color="primary" className="jr-btn">
                            <Clear/>
                            <span>반려</span>
                          </Button>
                  
                </div>
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
                        readOnly
                          margin="normal"
                          style={{width:"75px"}}
                          id="registrantEmployeeName"
                          label="등록자"
                          value={this.state.approvalDetail.firstApprover.employeeName}
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
                {/* <span style={{paddingLeft:"5%"}}>
                       <Button onClick={this.handleOK} style={{marginTop:"25px", width:"150px"}} variant="contained" color="secondary" className="jr-btn">
                        <CheckCircle/>
                        <span>결재</span>
                      </Button>
                      <Button onClick={this.handleReject} style={{marginTop:"25px", width:"150px"}} variant="contained" color="primary" className="jr-btn">
                        <Clear/>
                        <span>반려</span>
                      </Button> *
                      </span>
                
                      <span style={{float:"right"}}>
                     
                      <Approver arr={[this.state.approvalDetail.firstApprover, this.state.approvalDetail.secondApprover, this.state.approvalDetail.thirdApprover, this.state.approvalDetail.fourthApprover, this.state.approvalDetail.fifthApprover]}/>
                      </span>
                <span style={{paddingLeft:"15px", float:"left"}}>
                      <TextField 
                        readOnly
                          margin="normal"
                          id="registrantEmployeeName"
                          label="등록자"
                          value={this.state.approvalDetail.firstApprover.employeeName}
                      />
                     </span>
                      <TextField
                      
                          error
                          fullWidth
                          id="outlined-required"
                          label="결재서제목"
                          value={this.state.approvalDetail.approvalTitle}
                          margin="normal"
                          variant="outlined"
                      /> */}
                  </div>
                  <div style={{padding:"50px"}} dangerouslySetInnerHTML={{__html:this.state.approvalDetail.approvalContent}}/>
                  <SweetAlert show={this.state.open}
                                  custom
                                  showCancel
                                  confirmBtnText="확인"
                                  cancelBtnText="취소"
                                  confirmBtnBsStyle="primary"
                                  cancelBtnBsStyle="default"
                                  customIcon={this.state.text==='승인' ? 'https://cdn4.iconfinder.com/data/icons/business-elements-14/48/bl_279_confirmation_check_mark_agree_confirm_paper_hand-512.png' : 'https://tchol.org/images/access-denied-png-1.png'}
                                  title={"이 결재서류를 "+this.state.text+"하시겠습니까?"}
                                  onConfirm={this.onConfirm}
                                  onCancel={this.onCancel}
                      >
                  </SweetAlert>
              </Dialog>
            </div>
          );
    
  }


}

const mapStateToProps = ({approval}) => {
    const {} = approval;
    return {};
}

export default connect(mapStateToProps, {modifyApprovalStatus}) (FullScreenDialog);
