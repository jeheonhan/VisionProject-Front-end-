import React from 'react';
import { connect } from 'react-redux';
import { cleanStoreState,
         forgotPassword,
         requestIdentifyCode, } from 'actions/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SweetAlert from 'react-bootstrap-sweetalert'
import ChangePassword from 'components/login/ChangePassword';
import Snackbar from '@material-ui/core/Snackbar';

//휴대폰번호 Mask
class phoneMaskCustom extends React.Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={[ /\d/, /\d/, /\d/,'-', /\d/, /\d/,  /\d/,  /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        //showMask
      />
    );
  }
}



class ForgotPassword extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      success:false,
      flag:false,
      warning:false,
      prompt:false,
      changePwd:false,
      snackbar:false,
      snackbarContents:""
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]:event.target.value
    })
  }

  //스낵바 닫기
  handleRequestClose = () => {
    this.setState({
      snackbar:false,
      snackbarContents:""
    })
  }

  //성공 Alert 열기
  handleSuccessOpen = () => {
    this.setState({
      success:true,
      flag:true
    })
  }
  //성공 Alert 닫기
  handleSuccessClose = () => {
    this.setState({
      success:false,
      flag:false
    })
    this.props.cleanStoreState("resultBoolean");
  }

  //실패 Alert 열기
  handleWarningOpen = () => {
    this.setState({
      warning:true,
      flag:true
    })
  }

  //실패 Alert 닫기
  handleWarningClose = () => {
    this.setState({
      warning:false,
      flag:false
    })
    this.props.cleanStoreState("resultBoolean");
  }

  //인증번호 입력 화면 열기
  handleIdentifyOpen = () => {
    this.setState({
      flag:true,
      prompt:true
    })
  }

   //인증번호 입력 화면 닫기
   handleIdentifyClose = () => {
    this.setState({
      flag:false,
      prompt:false
    })
    this.props.cleanStoreState("resultBoolean");
  }

  //Submit
  handleSubmit = () => {
    if(this.state.id == null){
      this.setState({
        snackbar:true,
        snackbarContents:"아이디를 반드시 입력하세요."
      })
    }else if(this.state.name == null){
      this.setState({
        snackbar:true,
        snackbarContents:"이름을 반드시 입력하세요."
      })
    }else if(this.state.phone == null){
      this.setState({
        snackbar:true,
        snackbarContents:"휴대폰번호를 반드시 입력하세요."
      })
    }else{
      this.props.forgotPassword(this.state);
    }
  }

  render(){

    const { resultBoolean, identyCode } = this.props;

    if(!this.state.flag && resultBoolean != undefined && !resultBoolean){
      this.handleWarningOpen();
    }else if(!this.state.flag && resultBoolean != undefined && resultBoolean){
      this.handleIdentifyOpen();
    }

    const checkIdentyCode = () => {
      if(identyCode == this.state.identyCode){
        this.setState({
          changePwd:true
        })
      }else{
        alert("다름")
      }
    }

    console.log(this.state)
    console.log(resultBoolean)
    console.log(identyCode)

    if(!this.state.changePwd){
      return (
        <div
          className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
          <div className="login-content">
            <div className="login-header">
              <Link className="app-logo" to="/" title="Vision">
                <img src={require("assets/images/VisionLogo.png")} alt="vision" title="vision"/>
              </Link>
            </div>
    
            <div className="mb-2">
              <h2>비밀번호를 잊으셨습니까?</h2>
            </div>
    
            <div className="login-form">
              <form method="post" action="/">
                {!this.state.prompt ? (<div>
                <TextField
                    id="id"
                    label="아이디"
                    onChange={this.handleChange('id')}
                    fullWidth
                    margin="normal"
                    className="mt-0 mb-4"
                  />
                <TextField
                    id="name"
                    label="이름"
                    onChange={this.handleChange('name')}
                    fullWidth
                    margin="normal"
                    className="mt-0 mb-4"
                  />
                  <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="phone">휴대폰번호</InputLabel>
                      <Input
                        id="phone"
                        inputComponent={phoneMaskCustom}
                        value={this.state.phone ? `${this.state.phone}`:''}
                        inputProps={{
                        'aria-label': 'Description',
                        }}
                        onChange={this.handleChange('phone')}
                        fullWidth
                        />
                  </FormControl>
      
                  <Button variant="contained" color="primary" className="text-white" onClick={this.handleSubmit}>
                    전송
                  </Button>
                </div>)
                :
                (<div>
                  <TextField
                    type="text"
                    id="identyCode"
                    label="인증번호"
                    value={this.state.identyCode ? this.state.identyCode:""}
                    onChange={this.handleChange('identyCode')}
                    fullWidth
                    margin="normal"
                    className="mt-0 mb-4"
                    disabled={identyCode ? false:true}
                  />
                  {identyCode ? (
                  <Button variant="contained" color="primary" className="text-white" onClick={checkIdentyCode}>
                    확인
                  </Button>)
                  :
                  (<Button variant="contained" color="primary" className="text-white" 
                      onClick={e => {e.preventDefault(); this.props.requestIdentifyCode(this.state)}}>
                    인증번호요청
                  </Button>)}
                  
                </div>)}
              
    
               
              </form>
            </div>
          </div>
          <SweetAlert show={this.state.warning}
                      warning
                      confirmBtnText={"확인"}
                      confirmBtnBsStyle="danger"
                      cancelBtnBsStyle="default"
                      title={"Wrong"}
                      onConfirm={this.handleWarningClose}
          >등록된 아이디가 없습니다.</SweetAlert>

          <Snackbar
            anchorOrigin={{vertical:'top', horizontal:'center'}}
            open={this.state.snackbar}
            onClose={this.handleRequestClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.snackbarContents}</span>}
          />
        </div>
      );
    }else{
      return(
        <ChangePassword id={this.state.id}
        />
      );
    }

    
  }
}

const mapStateToProps = ({auth}) => {
  const { resultBoolean, identyCode } = auth;
  return { resultBoolean, identyCode };
}

export default connect(mapStateToProps, { cleanStoreState, forgotPassword, requestIdentifyCode })(ForgotPassword);


