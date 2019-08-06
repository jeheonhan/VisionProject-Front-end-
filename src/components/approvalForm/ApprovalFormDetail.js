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
import { Button } from '@material-ui/core';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            approvalFormTitle : "",
            approvalForm : "",
        }
    }


  handleAddApproval = (event, _formNo) => {
    event.preventDefault();
    this.setState({
      redirect:true,
      formNo : _formNo
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({
        ...this.state,
        redirect:false
      })

      return <Redirect to={{
        pathname: "/app/approval/approvalRequest",
        state: {form : this.props.targetForm.approvalForm, formNo: this.props.targetForm.approvalFormNo, formName: this.props.targetForm.approvalFormTitle}
      }}/>
    }
  }

  handleClickOpen = () => {
    this.setState({
      ...this.state,
      open: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      ...this.state,
      open: false
    });
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <Dialog
          open={this.props.open}
          onClose={this.handleRequestClose}
          TransitionComponent={Transition}
          maxWidth="lg"
        >
          <AppBar className="position-relative" style={{backgroundColor:"#CC4F3A"}}>
            <Toolbar>
              <IconButton onClick={this.props.handleClose} aria-label="Close">
                <CloseIcon/>
              </IconButton>
              <Typography variant="title" color="inherit" style={{
                flex: 1,
              }}>
                결재양식 상세조회
              </Typography>
              <span style={{float:"right"}}>
              <Button size="large" variant="contained" onClick={(event) => this.handleAddApproval(event, this.props.targetForm.approvalFormNo)}>결재서작성</Button>
              </span>
            </Toolbar>
          </AppBar>
          <div style={{paddingTop:"20px", paddingBottom:"20px"}}>
          <span style={{float:"left", paddingLeft:"50px"}}>
           <TextField
                error
                id="outlined-required"
                label="결재양식명"
                value={this.props.targetForm.approvalFormTitle}
                margin="normal"
                variant="outlined"
            />
            </span>
            <span style={{float:"left", paddingLeft:"50px"}}>
            <TextField
              
              margin="normal"
              id="registrantEmployeeName"
              label="등록자"
              value={this.props.targetForm.registrantEmployeeName}
            />
            </span>
            </div>
            <div style={{paddingLeft:"50px", paddingRight:"50px", paddingBottom:"50px"}} dangerouslySetInnerHTML={{__html:this.props.targetForm.approvalForm}}/>
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