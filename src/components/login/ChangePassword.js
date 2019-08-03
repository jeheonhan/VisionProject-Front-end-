import React from 'react';
import { connect } from 'react-redux';
import { cleanStoreState, modifyPassword } from 'actions/index';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SweetAlert from 'react-bootstrap-sweetalert';
import Snackbar from '@material-ui/core/Snackbar';

//휴대폰번호 Mask
class passwordMaskCustom extends React.Component {
    render() {
      return (
        <MaskedInput
          {...this.props}
          mask={[ /^[A-Za-z0-9+]*$/,/^[A-Za-z0-9+]*$/,/^[A-Za-z0-9+]*$/,/^[A-Za-z0-9+]*$/,/^[A-Za-z0-9+]*$/
            ,/^[A-Za-z0-9+]*$/,/^[A-Za-z0-9+]*$/,/^[A-Za-z0-9+]*$/,/^[A-Za-z0-9+]*$/,/^[A-Za-z0-9+]*$/
            ,/^[A-Za-z0-9+]*$/,/^[A-Za-z0-9+]*$/,/^[A-Za-z0-9+]*$/,/^[A-Za-z0-9+]*$/,/^[A-Za-z0-9+]*$/,/^[A-Za-z0-9+]*$/]}
          placeholderChar={'\u2000'}
          //showMask
        />
      );
    }
  }


class ForgotId extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      success:false,
      flag:false,
      warning:false,
      redirect:false,
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
      redirect:true
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

  //Submit
  handleSubmit = () => {
      const { newPassword, password } = this.state;

      if(newPassword == null){
        this.setState({
            snackbar:true,
            snackbarContents:"비밀번호를 반드시 입력하세요."
          })
      }else if(newPassword == password){
          this.props.modifyPassword({
            userId:this.props.id,
            password:password.trim()
          })
        this.handleSuccessOpen();
      }else{
        this.setState({
            snackbar:true,
            snackbarContents:"비밀번호가 서로 다릅니다. 정확히 입력하세요."
          })
      }
  }

  render(){

    if(this.state.redirect){
       return <Redirect to='/'/>;
    }

    console.log(this.state)
 
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
            <h2>비밀번호변경</h2>
          </div>
  
          <div className="login-form">
            <form method="post" action="/">
            <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="phone">새로운 비밀번호</InputLabel>
                    <Input
                        id="newPassword"
                        type="password"
                        //inputComponent={passwordMaskCustom}
                        value={this.state.newPassword ? `${this.state.newPassword}`:''}
                        inputProps={{
                        'aria-label': 'Description',
                        }}
                        onChange={this.handleChange('newPassword')}
                        fullWidth
                        />
            </FormControl>
            <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="phone">새로운 비밀번호 확인</InputLabel>
                    <Input
                        id="password"
                        type="password"
                        //inputComponent={passwordMaskCustom}
                        value={this.state.password ? `${this.state.password}`:''}
                        inputProps={{
                        'aria-label': 'Description',
                        }}
                        onChange={this.handleChange('password')}
                        fullWidth
                        />
            </FormControl>
  
              <p className="mb-3">
                <IntlMessages id="appModule.dntRememberEmail"/> &nbsp;
                <span className="small jr-link">
                  <IntlMessages id="appModule.contactSupport"/>
                </span>
              </p>
  
              <Button variant="contained" color="primary" className="text-white" onClick={this.handleSubmit}>
                확인
              </Button>
            </form>
          </div>
        </div>
        <SweetAlert show={this.state.success} success title="Success"
                    onConfirm={this.handleSuccessClose}>
          비밀번호가 변경되었습니다.
        </SweetAlert>

        <Snackbar
          anchorOrigin={{vertical:'top', horizontal:'center'}}
          open={this.state.snackbar}
          autoHideDuration="1500"
          onClose={this.handleRequestClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarContents}</span>}
        />
        
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {  } = auth;
  return {  };
}

export default connect(mapStateToProps, { cleanStoreState, modifyPassword })(ForgotId);

