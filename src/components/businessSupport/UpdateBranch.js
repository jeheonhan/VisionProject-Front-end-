import React from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import GetPostCode from 'components/accounting/GetPostCode';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from '@material-ui/core/DialogActions';
import Snackbar from '@material-ui/core/Snackbar';
import SweetAlert from 'react-bootstrap-sweetalert';

import { connect } from 'react-redux';
import { updateBranch, cleanStoreState } from 'actions/index';

function Transition(props) {
    return <Slide direction="down" {...props} />;
  }

  const localPhoneCode = [
    { value: '02', label: '02', }, { value: '051', label: '051', }, { value: '053', label: '053', },
    { value: '032', label: '032', }, { value: '062', label: '062', }, { value: '042', label: '042', },
    { value: '052', label: '052', }, { value: '044', label: '044', }, { value: '031', label: '031', }, 
    { value: '033', label: '033', }, { value: '043', label: '043', }, { value: '041', label: '041', },
    { value: '063', label: '063', }, { value: '061', label: '061', }, { value: '054', label: '054', },
    { value: '055', label: '055', }, { value: '064', label: '064', },
  ];
  
  class PhoneMask extends React.Component {
    render() {
      return (
        <MaskedInput
          {...this.props}
          mask={[ /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          placeholderChar={'\u2000'}
          // showMask
        />
      );
    }
  }
  
  class CorRegNumMask extends React.Component {
    render() {
      return (
        <MaskedInput
          {...this.props}
          mask={[ /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]}
          placeholderChar={'\u2000'}
          // showMask
        />
      );
    }
  }
  
  class BranchTelSeoulMask extends React.Component {
    render() {
      return (
        <MaskedInput
          {...this.props}
          mask={[ /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          placeholderChar={'\u2000'}
          // showMask
        />
      );
    }
  }
  
  class BranchTelLocalMask extends React.Component {
    render() {
      return (
        <MaskedInput
          {...this.props}
          mask={[ /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          placeholderChar={'\u2000'}
          // showMask
        />
      );
    }
  }

class UpdateBranch extends React.Component {

    state = {

        success : false,
        updateFlag : false,
        warning:false,
        snackBar:false,
        snackBarContents:'',
    }

    handleChange = name => event => {

      if(name == 'localPhoneCode'){
        this.setState({
          branch:{...this.state.branch, updateBranchTel : '', [name] : event.target.value}
        })
      }else{
        this.setState({
            branch : { ...this.state.branch, [name] : event.target.value}
        })
      }
    }

    handlePostcode = (zipCode, address) => {
        this.setState({
          branch : {...this.state.branch, address:address, zipCode:zipCode}
        })
      };

      submitBranch = () => {
        this.props.updateBranch(this.state.branch);
        this.setState({ updateFlag : false});
        this.props.cleanStoreState('branch');
        this.props.updateBranchClose();
      }

      onSweetAlert = (event) => {
        event.preventDefault();
        if(this.state.branch.branchName == undefined || (this.state.branch && this.state.branch.branchName=='')){
          this.openSnackBar('지점명')
        }else if(this.state.branch.branchManagerName == undefined || (this.state.branch && this.state.branch.branchManagerName=='')){
          this.openSnackBar('지점장명')
        }else if(this.state.branch.branchManagerPhone == undefined || (this.state.branch && this.state.branch.branchManagerPhone=='') ){
          this.openSnackBar('휴대폰번호')
        }else if(this.state.branch.businessLicenseNo == undefined || (this.state.branch && this.state.branch.businessLicenseNo=='') ){
          this.openSnackBar('사업자등록번호')
        }else if(this.state.branch.zipCode == undefined || (this.state.branch && this.state.branch.zipCode=='') ){
          this.openSnackBar('우편번호')
        }else if(this.state.branch.address == undefined || (this.state.branch && this.state.branch.address=='') ){
          this.openSnackBar('주소')
        }else{
        this.setState({
            warning:true,
        })
        }
    }

    warningOk = () => {
        this.setState({
            warning:false,
        })
        this.submitBranch();
    }

    onCancel = () => {
      this.setState({
          warning:false,
      })
      this.props.updateBranchClose();
    }

      closeUpdateBranch = () => {
        this.setState({ updateFlag : false});
        this.props.cleanStoreState('branch');
        this.props.updateBranchClose();
      }

      openSnackBar  = (valueName) => {
        this.setState({ ...this.state, snackBar: true, snackBarContents : valueName });
        };
    
      closeSnackBar = () => {
        this.setState({ ...this.state, snackBar: false });
      };

    render() {

        const {_branch} = this.props;

        if( !this.state.updateFlag ) {
            if(this.state.branch !== _branch && _branch !== null) {
                this.setState({
                    updateFlag : true,
                    branch : _branch
                })
            }
        }

        return(

        <div>

            <Dialog            
            open={this.props.open}
            TransitionComponent={Transition}
            maxWidth=""
            onClose={this.closeUpdateBranch}
          >
            <AppBar className="position-relative" >
            <Toolbar className="bg-secondary">
              <Typography variant="title" color="inherit" style={{
                flex: 1,
                minWidth: '800px',
                }} 
                align="left"
                >
                지점정보 수정
              </Typography>
              <DialogActions>
                <Button onClick={this.closeUpdateBranch} color="inherit" >닫기</Button>
              </DialogActions>
            </Toolbar>
          </AppBar>

          <div class="row">

          <div className="col-md-2"/>

            <div className="col-md-4">
                <TextField
                name="branchName"
                label="지점명"
                value={this.state.branch && this.state.branch.branchName}
                onChange={this.handleChange('branchName')}
                helperText="*필수입력란"
                margin="normal"
                fullWidth
                />                
            <br />
            </div>
            <div className="col-md-4 col-4" >
              <TextField
              name="branchManagerName"
              label="지점장명"
              value={this.state.branch && this.state.branch.branchManagerName}
              onChange={this.handleChange('branchManagerName')}
              helperText="*필수입력란"
              margin="normal"
              fullWidth
              />                
            </div>
          </div>

          <div class="row">

            <div className="col-md-2"/>

              <div className="col-md-2" >
              <TextField
                name="localPhoneCode"
                select
                label="지역번호"
                value={this.state.branch && this.state.branch.localPhoneCode}
                onChange={this.handleChange('localPhoneCode')}
                SelectProps={{}}
                margin="normal"
                fullWidth
              >
                {localPhoneCode.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="col-md-2 ">
            <FormControl className="mb-3" fullWidth margin='normal'>
              <InputLabel htmlFor="branchTel">지점전화번호</InputLabel>
                <Input
                    name="updateBranchTel"
                    label="지점전화번호"
                    value={this.state.branch && this.state.branch.updateBranchTel}
                    inputComponent={this.state.branch && this.state.branch.localPhoneCode === '02' ? BranchTelSeoulMask : BranchTelLocalMask}
                    inputProps={{
                      'aria-label': 'Description',
                      }}
                    onChange={this.handleChange('updateBranchTel')}
                    className="w-100 mb-3"
                    margin="normal"
                    fullWidth
                />
              </FormControl>
            </div>

            <div className="col-md-4">
            <FormControl className="mb-3" fullWidth margin='normal'>
            <InputLabel htmlFor="branchManagerPhone">지점장 휴대폰번호</InputLabel>
                <Input
                    name="branchManagerPhone"
                    label="지점장 휴대폰 번호"
                    value={this.state.branch && this.state.branch.branchManagerPhone}
                    inputComponent={PhoneMask}
                    inputProps={{
                      'aria-label': 'Description',
                      }}
                    onChange={this.handleChange('branchManagerPhone')}
                    helperText="*필수입력란"
                    margin="normal"
                    fullWidth
                />
            </FormControl>
            </div>
            </div>

            <div class="row">
              <div className="col-md-2"/>
                <div className="col-md-4 col-4">
                <FormControl className="mb-3" fullWidth margin='normal'>
                  <InputLabel htmlFor="businessLicenseNo">사업자등록번호</InputLabel>
                    <Input
                        name="businessLicenseNo"
                        label="사업자등록번호"
                        value={this.state.branch && this.state.branch.businessLicenseNo}
                        inputComponent={CorRegNumMask}
                        inputProps={{
                          'aria-label': 'Description',
                          }}
                        onChange={this.handleChange('businessLicenseNo')}
                        helperText="*필수입력란"
                        margin="normal"
                        fullWidth
                    />
                  </FormControl>
                  </div>
            </div>

            <div class="row">
              <div className="col-md-2"/>
                  <div className="col-md-2 col-4" >
                      <TextField
                          id="zipCode"
                          label="우편번호"
                          value={this.state.branch && this.state.branch.zipCode}
                          margin="normal"
                          fullWidth
                      />
                      <GetPostCode getPostcode={ this.handlePostcode }/>
                  </div>
            </div>



            <div class="row">
              <div className="col-md-2"/>
                <div className="col-md-6" >
                    <TextField
                        id="address"
                        label="주소"
                        value={this.state.branch && this.state.branch.address}
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div className="col-md-2" >
                    <TextField
                        id="detailAddress"
                        label="상세주소"
                        value={this.state.branch && this.state.branch.detailAddress}
                        onChange={this.handleChange('detailAddress')}
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div className="col-md-1"/>
              </div>
              <br/><br/>

              <div align="center">
                    <Button className="btn-block col-md-4 col-4" 
                            color="secondary" size="medium" 
                            onClick={this.onSweetAlert}
                            
                            >
                                수정하기
                    </Button>
                </div>
                <br/><br/>

              <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    open={this.state.snackBar}
                    onClose={this.closeSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackBarContents} 항목을 입력하지 않으셨습니다</span>}
                    autoHideDuration={1500}
                    />

                    <SweetAlert show={this.state.warning}
                          warning
                          showCancel
                          cancelBtnText="네"
                          confirmBtnText="아니오"
                          confirmBtnBsStyle="danger"
                          cancelBtnBsStyle="default"
                          title="지점정보를 수정합니다."
                          onConfirm={this.onCancel}
                          onCancel={this.warningOk}
                  >
                      지점정보를 수정하시겠습니까?
                  </SweetAlert>

            </Dialog>

          </div>

        );
    }

}

export default connect(null, { updateBranch, cleanStoreState })(UpdateBranch);