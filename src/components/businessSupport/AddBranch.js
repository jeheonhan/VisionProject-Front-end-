import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import GetPostCode from 'components/accounting/GetPostCode';
import { connect } from 'react-redux';
import { getLocalList, addBranch } from 'actions/index';
import MaskedInput from 'react-text-mask';
import {Redirect} from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import SweetAlert from 'react-bootstrap-sweetalert';


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

class AddBranch extends React.Component{


    state = {
        branch:{
          branchName : '',
          zipCode : '',
          address : '',
          detailAddress : '',
          businessLicenseNo : '',
          branchTel: '',
          branchManagerName: '',
          branchManagerPhone: '',
          localPhoneCode:'02',
        },
        snackBar:false,
        warning:false,
        snackBarContents:'',

        
      };
  
    handleChange =  name => e => {

      if(name == 'localPhoneCode'){
        this.setState({
          branch:{
            ...this.state.branch,
            branchTel : '', [name] : e.target.value
          }
        })
      }else{
        this.setState({
          branch : {
            ...this.state.branch,
          [name] : e.target.value,
          }
        });
      };
    }

      handlePostcode = (zipCode, address) => {
        this.setState({
          branch : {...this.state.branch, address:address, zipCode:zipCode}
        })
      };

      submitFn = () => {
        this.props.addBranch(this.state.branch);
        this.setState({
          redirect : true,
          branch:{
            branchName : '',
            zipCode : '',
            address : '',
            detailAddress : '',
            businessLicenseNo : '',
            branchTel: '',
            branchManagerName: '',
            branchManagerPhone: '',
            localPhoneCode:'02',
          },
        })
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
          this.submitFn();
      }

      onCancel = () => {
        this.setState({
            warning:false,
        })
      }

      renderRedirect = () => {
        if(this.state.redirect){
          this.setState({
            ...this.state,
            redirect : false,
          })

          return <Redirect to={{
            pathname: "/app/businessSupport/branch",
          }}/>
        }
      }

      openSnackBar  = (valueName) => {
        this.setState({ ...this.state, snackBar: true, snackBarContents : valueName });
        };
    
      closeSnackBar = () => {
        this.setState({ ...this.state, snackBar: false });
      };

    render() {

      // 페이지 처음 들어오거나 리로드할 때 모든 render()를 읽음,
      // reder()가 실행되는 경우는 2가지 -> 1.setState할 때, 2. reducer가 store 값을 setting할 때 
      console.log(this.state.branch)

        const { localList } = this.props;

        if( localList == undefined ){
          this.props.getLocalList();
        }

        return (

          <div>
            {this.renderRedirect()}
            <AppBar className="position-relative">
            <Toolbar className="bg-secondary">
              <Typography variant="h6" color="inherit" style={{
                flex: 1,
              }}>
                지점정보 입력
              </Typography>
            </Toolbar>
          </AppBar>

          <div class="row">

          <div className="col-md-2"/>

            <div className="col-md-4">
                <TextField
                name="branchName"
                label="지점명"
                value={this.state.branch.branchName}
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
              value={this.state.branch.branchManagerName}
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
                value={this.state.branch.localPhoneCode}
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
                    name="branchTel"
                    label="지점전화번호"
                    value={this.state.branch.branchTel}
                    inputComponent={this.state.branch.localPhoneCode === '02' ? BranchTelSeoulMask : BranchTelLocalMask}
                    inputProps={{
                      'aria-label': 'Description',
                      }}
                    onChange={this.handleChange('branchTel')}
                    className="w-100 mb-3"
                    margin="normal"
                    fullWidth
                />
              </FormControl>
            </div>

            <div className="col-md-2">
            <FormControl className="mb-3" fullWidth margin='normal'>
            <InputLabel htmlFor="branchManagerPhone">지점장 휴대폰번호</InputLabel>
                <Input
                    name="branchManagerPhone"
                    label="지점장 휴대폰 번호"
                    value={this.state.branch.branchManagerPhone}
                    inputComponent={PhoneMask}
                    inputProps={{
                      'aria-label': 'Description',
                      }}
                    onChange={this.handleChange('branchManagerPhone')}
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
                        value={this.state.branch.businessLicenseNo}
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
                          value={this.state.branch.zipCode}
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
                        value={this.state.branch.address}
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div className="col-md-2" >
                    <TextField
                        id="detailAddress"
                        label="상세주소"
                        value={this.state.branch.detailAddress}
                        onChange={this.handleChange('detailAddress')}
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div className="col-md-1"/>
              </div>

              <br/><br/>
                <div align="center">
                <Button className="btn-block text-white  bg-deep-orange col-md-4 col-4" 
                        color="default" size="medium" onClick={this.onSweetAlert}>
                  등록하기
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
                            cancelBtnText="아니오"
                            confirmBtnText="네"
                            confirmBtnBsStyle="danger"
                            cancelBtnBsStyle="default"
                            title="지점을 등록합니다."
                            onConfirm={this.warningOk}
                            onCancel={this.onCancel}
                    >
                        이대로 등록하시겠습니까?
                    </SweetAlert>
            
            </div>


        )
    }

}

const mapStateToProps = ( {businessSupport} ) => {
  const { localList } = businessSupport;
  return { localList };
}

export default connect(mapStateToProps, { getLocalList, addBranch })(AddBranch);