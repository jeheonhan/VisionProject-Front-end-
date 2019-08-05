import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Slide from '@material-ui/core/Slide';
import { DialogContent } from '@material-ui/core';
import { convertBranchStatusCode, getBranchList } from 'actions/index';
import { connect } from 'react-redux';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

  class GetBranchDetail extends React.Component {

    constructor(props){

      super(props);

      this.state = {
        branch : {
            branchNo:""
            ,branchName:""
            ,localCodeName:""
            ,zipCode:""
            ,address:""
            ,detailAddress:""
            ,branchManagerName:""
            ,businessLicenseNo:""
            ,branchTel:""
            ,branchManagerPhone:""
            ,branchRegDate:""
            ,branchStatus:""
        },
      }
  }
     
    /*handleClickOpen = () => {
      this.setState({open: true});
    }; */
  
    closeBranchDetail = (event) => {
      event.preventDefault();
      this.setState({open: false});
    };

    convertBranchStatusCode = ( branch ) => {
      this.props.convertBranchStatusCode(branch);
      this.props.handleRequestClose();
    }

    render() {

      if(this.props.branch!==undefined && this.props.branch !== this.state.branch){
        this.setState({ branch : this.props.branch});
      }

      //console.log(this.state)
      
      return (
        
          <Dialog            
            open={this.props.open}
            TransitionComponent={Transition}
            maxWidth="sm"
            onClose={this.props.handleRequestClose}
          >
          
          <AppBar className="position-relative" >
            <Toolbar className="bg-secondary">
              <Typography variant="h6" color="inherit" style={{
                flex: 1,
                }} 
                align="center"
                >
                [{this.state.branch.branchNo}] {this.state.branch.branchName} 지점정보
              </Typography>
              {/* <Button //className="text-white"
                onClick={this.props.handleRequestClose} 
                variant="contained" 
                aria-label="Close" >
                    <i class="zmdi zmdi-close-circle"></i>닫기
              </Button> */}
            </Toolbar>
          </AppBar>
          
          <DialogContent style={{minHeight:'350px', maxHeight:'350px', overflow:"hidden"}}>

              <List>
                <ListItem style={{marginLeft:"40%"}}>
                    <div style={{color: (this.state.branch.branchStatus==="영업중" ? "blue" : "red")}}>{this.state.branch.branchStatus}</div>
                </ListItem>

                <ListItem>
                  <i class="zmdi zmdi-phone zmdi-hc-2x"></i> &nbsp;&nbsp; {this.state.branch.branchTel} 
                  <i class="zmdi zmdi-smartphone-android zmdi-hc-2x" style={{marginLeft:"20px"}}></i> &nbsp;&nbsp; {this.state.branch.branchManagerPhone}
                </ListItem>

                <ListItem>
                  <i class="zmdi zmdi-pin zmdi-hc-2x"></i>  &nbsp;&nbsp;(우){this.state.branch.zipCode} <br/> &nbsp;{this.state.branch.address} {this.state.branch.detailAddress}
                </ListItem>
                <br/>
                <ListItem>
                  <div>지점장 : {this.state.branch.branchManagerName}</div>
                </ListItem>

                <ListItem>
                  <div>지점등록일 : {this.state.branch.branchRegDate}</div>
                </ListItem>

                <ListItem>
                  <div>사업자등록번호 : {this.state.branch.businessLicenseNo}</div>
                </ListItem>

              </List>
          </DialogContent>
          </Dialog>
      );
    }
  }

  export default connect(null, { convertBranchStatusCode , getBranchList })(GetBranchDetail);