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
        branch : this.props.branch,
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

      if(this.props.branch !== this.state.branch){
        this.setState({ branch : this.props.branch});
      }

      console.log(this.state)
      
      return (
        
          <Dialog            
            open={this.props.open}
            TransitionComponent={Transition}
            maxWidth=""
            //onClose={this.props.handleRequestClose}
          >
          
          <AppBar className="position-relative" >
            <Toolbar className="bg-secondary">
              <Typography variant="title" color="inherit" style={{
                flex: 1,
                minWidth: '800px',
                }} 
                align="center"
                >
                지점 상세조회
              </Typography>
            </Toolbar>
          </AppBar>
          
          <DialogContent style={{minWidth: '800px', maxWidth: '800px', minHeight:'400px', maxHeight:'400px'}}>

              <List>
                <ListItem>
                  <div>지점번호 : {this.state.branch.branchNo}</div>
                </ListItem>

                <ListItem>
                  <div>지점명 : {this.state.branch.branchName}</div>
                </ListItem>

                <ListItem>
                  <div>지   역  : {this.state.branch.localCodeName}</div>
                </ListItem>

                <ListItem>
                  <div>우편번호 : {this.state.branch.zipCode}</div>
                </ListItem>

                <ListItem>
                <div> 주  소 : {this.state.branch.address}</div>
                </ListItem>

                <ListItem>
                  <div>상세주소 : {this.state.branch.detailAddress}</div>
                </ListItem>

                <ListItem>
                  <div>지점장명 : {this.state.branch.branchManagerName}</div>
                </ListItem>

                <ListItem>
                  <div>사업자등록번호 : {this.state.branch.businessLicenseNo}</div>
                </ListItem>

                <ListItem>
                  <div>지점전화번호 : {this.state.branch.branchTel}</div>
                </ListItem>

                <ListItem>
                  <div>지점장휴대폰번호 : {this.state.branch.branchManagerPhone}</div>
                </ListItem>

                <ListItem>
                  <div>지점등록일 : {this.state.branch.branchRegDate}</div>
                </ListItem>

                <ListItem>
                <div> 영업상태 : {this.state.branch.branchStatus}</div>
                </ListItem>
                
              </List>

          </DialogContent>
            <div align="right">
              <Button onClick={() => this.convertBranchStatusCode(this.state.branch)} 
                      variant="outlined" 
                      >
                  <i class="zmdi zmdi-refresh-sync-alert zmdi-hc-spin"></i>{this.state.branch.branchStatusCodeNo == '01' ? '폐업전환' : '영업전환'} 
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
              <br/><br/>

          <Button onClick={this.props.handleRequestClose} variant="outlined" aria-label="Close" ><i class="zmdi zmdi-close-circle zmdi-hc-1g"></i>닫기</Button>
              <br/>

          </Dialog>
      );
    }
  }

  export default connect(null, { convertBranchStatusCode , getBranchList })(GetBranchDetail);