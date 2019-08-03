import React from 'react';
import { connect } from 'react-redux';
import { forgotUserId, cleanStoreState } from 'actions/index';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SweetAlert from 'react-bootstrap-sweetalert'
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

class ForgotId extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      success:false,
      flag:false,
      warning:false,
      snackbar:false,
      snackbarContents:"",
      redirect:false
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
    this.props.cleanStoreState("forgotId");
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
    this.props.cleanStoreState("forgotId");
  }

  //Submit
  handleSubmit = () => {
    if(this.state.name == null){
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
      this.props.forgotUserId(this.state)
    }
  }

  render(){

    const { forgotId } = this.props;

    if(this.state.redirect){
      return <Redirect to='/'/>;
   }

    if(!this.state.flag && forgotId && forgotId.userId != null){
      this.handleSuccessOpen();
    }else if(!this.state.flag && forgotId && forgotId.userId == null){
      this.handleWarningOpen();
    }
 
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
            <h2>아이디를 잊으셨습니까?</h2>
          </div>
  
          <div className="login-form">
            <form method="post" action="/">
              <TextField
                type="text"
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
              <br/>
              <Button variant="contained" color="primary" className="text-white" onClick={this.handleSubmit}>
                확인
              </Button>
            </form>
          </div>
        </div>
        <SweetAlert show={this.state.success} success title="Success"
                    onConfirm={this.handleSuccessClose}>
          등록된 휴대폰번호로 아이디를 전송하였습니다.
        </SweetAlert>
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
  const { forgotId } = auth;
  return { forgotId };
}

export default connect(mapStateToProps, { forgotUserId, cleanStoreState })(ForgotId);

