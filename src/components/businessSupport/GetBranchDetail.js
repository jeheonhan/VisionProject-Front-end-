import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import SweetAlert from 'react-bootstrap-sweetalert';
import { convertBranchStatusCode, getBranchList } from 'actions/index';
import { connect } from 'react-redux';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

  class GetBranchDetail extends React.Component {

    constructor(props){

      super(props);

      this.state = {
        warning:false,
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

    onSweetAlert = (event) => {
      event.preventDefault();
      this.setState({
          warning:true,
      })
    }

    warningOk = () => {
      this.setState({
          warning:false,
      })
      this.convertBranchStatusCode(this.state.branch);
    }

    onCancel = () => {
        this.setState({
            warning:false,
        })
    }

    render() {

      if((this.state.branch && this.state.branch == undefined) || this.props.branch !== this.state.branch){
        this.setState({ branch : this.props.branch});
      }

      //console.log(this.state)
      
      return (
        
          <Dialog            
            open={this.props.open}
            TransitionComponent={Transition}
            maxWidth=""
            onClose={this.props.handleRequestClose}
          >
          
          <AppBar className="position-relative" >
            <Toolbar className="bg-secondary">
              <Typography variant="title" color="inherit" style={{
                flex: 1,
                minWidth: '800px',
                }} 
                align="left"
                >
                지점 상세조회
              </Typography>
              <DialogActions>
                <Button onClick={this.props.handleRequestClose} color="inherit" >닫기</Button>
              </DialogActions>
            </Toolbar>
          </AppBar>

          <div class="row">
            <div className="col-md-1"/>
            <div className="col-md-3">
                <TextField
                      label="지점번호"
                      value={this.state.branch && this.state.branch.branchNo}
                      margin="normal"
                />
            </div>
            <div className="col-md-2">
                <TextField
                      label="영업상태"
                      value={this.state.branch && this.state.branch.branchStatus}
                      margin="normal"
                />
            </div>
            <div className="col-md-3">
                <TextField
                      label="지점등록일"
                      value={this.state.branch && this.state.branch.branchRegDate}
                      margin="normal"
                />
            </div>
            </div>
            <br/>
          <div class="row">
          <div className="col-md-1"/>
              <div className="col-md-3">
                  <TextField
                        label="지점명"
                        value={this.state.branch && this.state.branch.branchName}
                        margin="normal"
                        fullWidth
                        />

                </div>
          </div>
          <br/>

          <div class="row">
            <div className="col-md-1"/>
            <div className="col-md-3">
                <TextField
                      label="지점장명"
                      value={this.state.branch && this.state.branch.branchManagerName}
                      margin="normal"
                      fullWidth
                />
            </div>
            <div className="col-md-3">
                <TextField
                      label="사업자등록번호"
                      value={this.state.branch && this.state.branch.businessLicenseNo}
                      margin="normal"
                      fullWidth
                />
            </div>
          </div>
          <br/>

          <div class="row">
            <div className="col-md-1"/>
            <div className="col-md-3">
                <TextField
                      label="지점 전화번호"
                      value={this.state.branch && this.state.branch.branchTel}
                      margin="normal"
                      fullWidth
                />
            </div>
            <div className="col-md-3">
                <TextField
                      label="지점장 휴대폰번호"
                      value={this.state.branch && this.state.branch.branchManagerPhone}
                      margin="normal"
                      fullWidth
                />
            </div>
          </div>
          <br/>

          <div class="row">
            <div className="col-md-1"/>
                <div className="col-md-3">
                    <TextField
                          label="우편번호"
                          value={this.state.branch && this.state.branch.zipCode}
                          margin="normal"
                          fullWidth
                    />
                </div>
              <div className="col-md-3">
                    <TextField
                          label="지역"
                          value={this.state.branch && this.state.branch.localCodeName}
                          margin="normal"
                          fullWidth
                    />
                </div>
          </div>

          <div class="row">
            <div className="col-md-1"/>
            <div className="col-md-8">
                    <TextField
                          label="주소"
                          value={this.state.branch && this.state.branch.address}
                          margin="normal"
                          fullWidth
                    />
                </div>
                <div className="col-md-2">
                    <TextField
                          label="상세주소"
                          value={this.state.branch && this.state.branch.detailAddress}
                          margin="normal"
                          fullWidth
                    />
                </div>
          </div>

          <br/><br/>
                <div align="center">
                  <Button onClick={this.onSweetAlert} 
                          >
                      <i class="zmdi zmdi-refresh-alt zmdi-hc-spin-reverse"></i>{this.state.branch && this.state.branch.branchStatusCodeNo == '01' ? '폐업전환' : '영업전환'} 
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button color="secondary"  onClick={() => this.props.updateBranchOpen(this.state.branch.branchNo)}>
                          수정
                  </Button>
                </div>
          <br/><br/>

            <SweetAlert show={this.state.warning}
                        warning
                        showCancel
                        cancelBtnText="네"
                        confirmBtnText="아니오"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="default"
                        title={this.state.branch && this.state.branch.branchStatusCodeNo == '01' ? '폐업상태로 전환합니다.' : '영업상태로 전환합니다.'}
                        onConfirm={this.onCancel}
                        onCancel={this.warningOk}
                >
                    영업상태를 변경하시겠습니까?
                </SweetAlert>
          </Dialog>
      );
    }
  }

  export default connect(null, { convertBranchStatusCode , getBranchList })(GetBranchDetail);