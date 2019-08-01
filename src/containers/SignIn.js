import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  hideMessage,
  showAuthLoader,
  userSignIn,
} from 'actions/Auth';
import ForgotId from 'components/login/ForgotId';
import ForgotPassword from 'components/login/ForgotPassword';

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: 'trueId',
      password: 'truePwd',
      loginOpen:true,
      forgotIdOpen:false,
      forgotPwdOpen:false
    }
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
    if (this.props.authUser !== null) {
      this.props.history.push('/');
    }
  }

  //아이디 찾기 화면 열기
  handleForgotIdOpen = () => {
    this.setState({
      loginOpen:false,
      forgotIdOpen:true
    })
  }

   //비밀번호 찾기 화면 열기
   handleForgotPwdOpen = () => {
    this.setState({
      loginOpen:false,
      forgotPwdOpen:true
    })
  }

  render() {
    
    const {showMessage, loader, alertMessage} = this.props;
    console.log(this.state)
    return (
      
      <div
        className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        {this.state.loginOpen && (
          <div className="app-login-main-content">

          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/app/home" title="vision">
              <img src={require("assets/images/VisionLogo.png")} alt="vision" title="vision"
                width="230" height="100"/>
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-header mb-4">
              {/* <IntlMessages 는 다국적 웹페이지 구현 시의 번역을 위해 나타난 컴포넌트(?) 
              안드로이드에서 string 메타데이터로 뺐던 거 생각하면 될듯. 아이디로 접근해서 해당 언어의 값을 가져옴*/}
              {/* <h1><IntlMessages id="appModule.id"/></h1> */}
              <h1>최첨단 비-죤 類似 이알피 씨-스템</h1>
            </div>

            <div className="app-login-form">
              <form>
                <fieldset>
                  <TextField
                    label="아이-디"
                    fullWidth
                    onChange={(event) => this.setState({userId: event.target.value}) }
                    //defaultValue={this.state.id}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />
                  <TextField
                    type="password"
                    label="패쓰-워어드"
                    fullWidth
                    onChange={(event) => this.setState({password: event.target.value})}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />

                  <p className="mb-3">
                    아이디가 기억나지 않으신가요? &nbsp;
                    <span className="small jr-link text-orange" onClick={this.handleForgotIdOpen}>
                      아이디찾기
                    </span>
                    <span className="small jr-link text-orange">
                      &nbsp;/&nbsp;
                    </span>
                    <span className="small jr-link text-orange" onClick={this.handleForgotPwdOpen}>
                      비밀번호찾기
                    </span>
                  </p>

                  <div className="d-flex align-items-center justify-content-between">
                    <Button onClick={(event) => {
                      event.preventDefault();
                      // showAuthLoader()는 actions/Auth.js의 action : {type: ON_SHOW_LOADER,}을 return하는 함수
                      // 이 action이 발생해서 circle progress bar가 화면에 나타남
                      this.props.showAuthLoader();
                      //userSignIn(user)은 actions/Auth.js의 action : {type: SIGNIN_USER, payload: user}을 return하는 함수
                      // 이 action이 발생해서 sagas/Auth.js의 function* signInUser()이 실행됨
                      this.props.userSignIn(this.state);
                    }} variant="contained" className="jr-btn bg-red text-white" size="large">
                      {/* 영어로 쓰면 버튼에서 대문자로 바뀜 */}
                      로그인
                    </Button>
                    
                  </div>                  

                </fieldset>
              </form>
            </div>
          </div>

        </div>
        )}
        
        {/* 조건부 렌더링 [참고 : https://reactjs-kr.firebaseapp.com/docs/conditional-rendering.html] 
            논리 && 연산자 ==> 논리가 true라면 && 다음요소가 노출, false라면 무시*/}
        {
          loader &&
          <div className="loader-view">
            <CircularProgress/>
          </div>
        }
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer/>

        {this.state.forgotIdOpen && (<ForgotId/>)}
        {this.state.forgotPwdOpen && (<ForgotPassword/>)}
        
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  //reducer/Auth.js가 로그인 성공 시에 authUser를 store에 저장
  //                  로그인 실패 시에 showMessage를 true, alertMessage는 payload로 store에 저장
  const {loader, alertMessage, showMessage, authUser} = auth;
  return {loader, alertMessage, showMessage, authUser}
};

export default connect(mapStateToProps, {
  userSignIn,
  hideMessage,
  showAuthLoader
})(SignIn);
