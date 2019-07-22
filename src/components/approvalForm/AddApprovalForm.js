import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {connect} from 'react-redux'
import {addApprovalForm} from 'actions/Approval'
import ApprovalFormCKEditor from './ApprovalFormCKEditor'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {

    constructor(props){
        super(props);
        const employeeNo = localStorage.getItem("user").employeeNo!==undefined ? localStorage.getItem("user").employeeNo : "1001"
        const employeeName = localStorage.getItem("user").employeeName!==undefined ? localStorage.getItem("user").employeeName : "안채은"
        this.state = {
            ...this.state,
            approvalFormTitle : "",
            approvalForm : "",
            registrantEmployeeName: employeeName,
            registrantEmployeeNo : employeeNo
        }
    }



  handleTitle = (event) => {
      this.setState({
        ...this.state,
        approvalFormTitle : event.target.value
      })
  }

  handleForm = (event) => {
      this.setState({
          ...this.state,
          approvalForm : event.editor.getData()
      })
  }

  handleClickOpen = () => {
    this.setState({
      ...this.state,
      open: true
    });
  };
  handleAdd = () => {
    this.props.addApprovalForm(this.state);
    this.handleRequestClose();
  }
  handleRequestClose = () => {
    const employeeNo = localStorage.getItem("user").employeeNo!==undefined ? localStorage.getItem("user").employeeNo : "1001"
    const employeeName = localStorage.getItem("user").employeeName!==undefined ? localStorage.getItem("user").employeeName : "안채은"
    this.setState({
      open: false,
      approvalFormTitle : "",
      approvalForm : "",
      registrantEmployeeName: employeeName,
      registrantEmployeeNo : employeeNo
    });
  };

  render() {
    return (
      <div>
        <Button variant="contained" className="bg-deep-orange text-white" onClick={this.handleClickOpen}>등록</Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleRequestClose}
          TransitionComponent={Transition}
        >
          <AppBar className="position-relative">
            <Toolbar>
              <IconButton onClick={this.handleRequestClose} aria-label="Close">
                <CloseIcon/>
              </IconButton>
              <Typography variant="title" color="inherit" style={{
                flex: 1,
              }}>
                결재양식등록
              </Typography>
              <Button onClick={this.handleAdd}>
                등록
              </Button>
            </Toolbar>
          </AppBar>
          <div>
          <span style={{float:"left", paddingLeft:"50px"}}>
           <TextField
                error
                id="outlined-required"
                label="결재양식명"
                value={this.state.approvalFormTitle}
                placeholder="결재양식의 이름을 입력하세요."
                margin="normal"
                variant="outlined"
                onChange={this.handleTitle}
            />
            </span>
            <span style={{float:"center", paddingLeft:"50px"}}>
            <TextField
              margin="normal"
              id="registrantEmployeeName"
              label="등록자"
              value={this.state.registrantEmployeeName}
            />
            </span>
            </div>
            <Divider/>
            <ApprovalFormCKEditor handleForm={this.handleForm} content={this.state.approvalForm}></ApprovalFormCKEditor>
        </Dialog>
      </div>
    );
  }


}

const mapStateToProps = ({approval}) => {
    const {} = approval;
    return {};
}

export default connect(mapStateToProps, {addApprovalForm}) (FullScreenDialog);