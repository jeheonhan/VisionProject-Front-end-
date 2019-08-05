import React from 'react';
import { connect } from 'react-redux';
import { checkedEmployee, getCodeList, addCard, cleanStoreState  } from 'actions/index';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import CardBox from 'components/CardBox';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FileBase64 from 'components/base64/react-file-base64';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FindEmployee from 'components/humanResource/FindEmployee';
import FindAccount from 'components/accounting/FindAccount';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SweetAlert from 'react-bootstrap-sweetalert';
import Snackbar from '@material-ui/core/Snackbar';

class TextMaskCustom extends React.Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={[ /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/  ]}
        placeholderChar={'\u2000'}
      />
    );
  }
}

class AddCard extends React.Component {

  //super(props) 선언전까지 constructor에서 this 키워드를 사용할 수 없다.
  //자바스크립트에서는 허용되지 않는다.
  //super 키워드 안에 props를 작성하지 않아도 render 메서드에서 this.props를 사용 할 수 있다.
  //단 constructor에서 super()가 불려진 이후에도 this.props는 여전히 undefined 일 것
  constructor(props){

    super(props);

    this.state = {
      cardRegNo : "",
      cardManager : "",
      cardManagerName : "",
      cardCategoryCodeNo : "",
      cardCategoryCodeName : "",
      cardName : "",
      cardCompanyCodeNo : "",
      cardCompanyCodeName : "",
      cardImage : "",
      cardUsageStatusCodeNo : "",
      accountNo : "",
      cardNo : '',
      cardImageFile : "",
      findEmployeeOpen : false,
      findAccountOpen : false,
      success : false,
      snackBar: false,
      snackBarContents : '',
    }
  }

  //카드등록 다이얼로그창 닫기
  handleRequestClose = () => {
    this.setState({
      ...this.state,
      success : false,
      cardRegNo : "",
      cardManager : "",
      cardManagerName : "",
      cardCategoryCodeNo : "",
      cardCategoryCodeName : "",
      cardName : "",
      cardCompanyCodeNo : "",
      cardCompanyCodeName : "",
      cardImage : "",
      cardUsageStatusCodeNo : "",
      accountNo : "",
      cardNo : '',
      cardImageFile : ''
    });
    this.props.cleanStoreState("checkedEmployeeData");
    this.props.close();
  };

  //사원찾기 다이얼로그창 열기
  handleFindEmployeeOpen = () => {
    this.setState({findEmployeeOpen: true})
  }

  //사원찾기 다이얼로그창 닫기
  handleFindEmployeeClose = () => {
      this.setState({findEmployeeOpen: false})
  }

  //계좌찾기 다이얼로그창 열기
  handleFindAccountOpen = () => {
    this.setState({findAccountOpen: true})
  }

  //계좌찾기 다이얼로그창 닫기
  handleFindAccountClose = () => {
    this.setState({findAccountOpen: false})
  }

  //프로필 파일업로드 화면 열기
  handleOnClickFileUpload = (e) => {
    document.getElementById('profileInputFile').click();
  }

  //프로필 사진 업로드
  handleProfileImgUpload = (files) => {
    this.setState({
      cardImageFile : files
    })
  }

  //계좌번호 입력
  getAccountNo = (_accountNo) => {
    this.setState({
      accountNo : _accountNo
    })
  }

  //카드 등록값 입력
  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value });
    console.log(this.state)
  };
  

  //등록성공알람 켜기
  openSuccessAlarm = () => {
    this.setState({
      ...this.state,
      success : true
    })
  }

  //등록성공알람 끄기
  closeSuccessAlarm = () => {
    this.setState({
      ...this.state,
      success : false
    })
    this.handleRequestClose()
  }

  //snackBar 열기
  openSnackBar  = (valueName) => {
    this.setState({ ...this.state, snackBar: true, snackBarContents : valueName });
  };

  //snackBar 닫기
  closeSnackBar = () => {
    this.setState({ ...this.state, snackBar: false });
  };
  
  render() {
    
    const { cardList, cardCategoryList } = this.props;
    
    //파일업로드용 makeStyles
    const classes = makeStyles(theme => ({
      button: {
        margin: theme.spacing(1),
      },
      leftIcon: {
        marginRight: theme.spacing(1),
      },
      rightIcon: {
        marginLeft: theme.spacing(1),
      },
      iconSmall: {
        fontSize: 20,
      },
    }));

    //왜 굳이 const로 만들어서 줬지? 그냥 this.props로 줘도 되지 않나
    //this.props 하나로 다 받을 수 있어서 재사용성을 높을 듯?
    const { checkedEmployeeData } = this.props;
    
    //상위 Component의 state 값에 profileImage가 저장되어 있으면 가져옴
    // const { profileFile } = this.state.employee;

    if(cardList === undefined) {
      this.props.getCodeList({ searchKeyword : "card" });
      this.props.getCodeList({ searchKeyword : "cardCategory" });
    }
 
    //카드등록
    const submitCard = () => {
      
      if(checkedEmployeeData === undefined){
        this.openSnackBar('카드관리자')
      } else if(this.state.cardCategoryCodeNo === ''){
        this.openSnackBar('카드종류 구분')
      } else if(this.state.cardName === ''){
        this.openSnackBar('카드명')
      } else if(this.state.cardCompanyCodeNo === ''){
        this.openSnackBar('카드사 구분')
      } else if(this.state.accountNo === ''){
        this.openSnackBar('계좌번호')
      } else if(this.state.cardNo === ''){
        this.openSnackBar('카드번호')
      } else {
   
        this.props.addCard({
          cardManager : checkedEmployeeData.employeeNo,
          cardCategoryCodeNo : this.state.cardCategoryCodeNo,
          cardName : this.state.cardName,
          cardCompanyCodeNo : this.state.cardCompanyCodeNo,
          cardImageFile : this.state.cardImageFile,
          accountNo : this.state.accountNo,
          cardNo : this.state.cardNo,
        })
        console.log(this.state)
        this.props.cleanStoreState("checkedEmployeeData");
        this.openSuccessAlarm()
      }

    }
    
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.handleRequestClose}
          TransitionComponent={Transition}>
            <AppBar className="position-relative">
              <Toolbar>
                <Typography variant="title" color="inherit" style={{
                  flex: 1,
                }}>
                  카드 등록
                </Typography>
                <Button color={"inherit"}   onClick={this.handleRequestClose}>
                  닫기
                </Button>
              </Toolbar>
            </AppBar>
          
          <p/>

          <div align="center">
            <CardBox styleName="col-lg-6" >
              <form className="row" noValidate autoComplete="off">

                <div className="col-md-12 col-6">
                  <br/>
                    <Typography align="left" variant="h6" color="textPrimary" style={{
                      flex: 1,
                      float:"initial",
                      paddingLeft:"15px",
                      display:"block",
                    }}>
                      카드 정보를 입력해주세요
                    </Typography>
                  <br/>
                </div>

                <div className="col-md-12 col-6" style={{float:"left"}}>
                  <br/><br/>
                    <div className="card-media card-img-top" style={{paddingBottom:"30px"}}>
                       <img src={ this.state.cardImageFile ? `${this.state.cardImageFile.base64}` : require("assets/images/basicCard2.png")} style={{width: 300, height: 200}}/>
                    </div>
                </div>
                <div className="col-md-12 col-6">
                  <Button variant="contained" color="default" className={classes.button} 
                        onClick={this.handleOnClickFileUpload}>
                    카드사진  
                    <CloudUploadIcon className={classes.rightIcon} />
                  </Button>
                </div>      

                <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
                  <FormControl className="mb-3" fullWidth margin='normal'>
                    <InputLabel htmlFor="cardNo">카드번호</InputLabel>
                      <Input
                        id="cardNo"
                        value={this.state.cardNo}
                        inputComponent={TextMaskCustom}
                        className="w-100 mb-3"
                        inputProps={{
                        'aria-label': 'Description',
                        }}
                        onChange={this.handleChange('cardNo')}
                        placeholder="카드번호 입력"
                      />
                  </FormControl>
                </div>

                <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
                  <TextField
                    id="cardName"
                    label="카드명"
                    placeholder="카드명 입력"
                    value={this.state.cardName}
                    fullWidth
                    margin="normal"
                    onChange={this.handleChange('cardName')}
                  />
                </div>

                <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}> 
                  <TextField
                    id="cardCompanyCodeNo"
                    select
                    label="카드사 구분"
                    value={this.state.cardCompanyCodeNo}
                    SelectProps={{}}
                    margin="none"
                    fullWidth
                    onChange={this.handleChange('cardCompanyCodeNo')}
                  >
                  {cardList && cardList.map(option => (
                      <MenuItem key={option.codeNo} value={option.codeNo}>
                          {option.codeName}
                      </MenuItem>
                  ))}
                  </TextField>
                </div>

                <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
                    <TextField
                        id="cardCategoryCodeNo"
                        select
                        label="카드종류 구분"
                        value={this.state.cardCategoryCodeNo}
                        SelectProps={{}}
                        margin="none"
                        fullWidth
                        onChange={this.handleChange('cardCategoryCodeNo')}
                    >
                    {cardCategoryList && cardCategoryList.map(option => (
                        <MenuItem key={option.codeNo} value={option.codeNo}>
                            {option.codeName}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>

                <div className="col-md-6 col-6" style={{float:"left", display:"inline", marginTop:'15px'}}>
                  {/* 카드관리자와 관리자 번호는 직접 건들지 않아서 onChange를 안줘도 됨*/}
                  <TextField
                    margin="normal"
                    id="cardManager"
                    label="카드관리자 사원번호"
                    helperText="항목을 클릭하여 관리자를 선택해주세요"
                    //사원번호 클릭시 자식컴포넌트 Open값을 true로 변경
                    onClick={this.handleFindEmployeeOpen}
                    value={checkedEmployeeData && checkedEmployeeData.employeeNo}
                    fullWidth
                  />
                </div>
                <div className="col-md-6 col-6" style={{float:"left", display:"inline", marginTop:'15px'}}>
                  <TextField
                    margin="normal"
                    id="cardManagerName"
                    label="카드관리자"
                    helperText="항목을 클릭하여 관리자를 선택해주세요"
                    onClick={this.handleFindEmployeeOpen}
                    value={checkedEmployeeData && checkedEmployeeData.employeeName}
                    fullWidth
                  />
                </div>
                <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
                  {/* 카드관리자와 관리자 번호는 직접 건들지 않아서 onChange를 안줘도 됨*/}
                  <TextField
                    margin="normal"
                    id="accountNo"
                    label="계좌번호"
                    helperText="항목을 클릭하여 계좌를 선택해주세요"
                    onClick={this.handleFindAccountOpen}
                    value={this.state.accountNo}
                    fullWidth
                  />
                </div>

                <div style={{display:"none"}} >
                  카드 사진
                  <FileBase64 
                    multiple={false}
                    onDone = {this.handleProfileImgUpload}
                    inputId="profileInputFile"
                    />
                </div>

                <div className="col-md-12 col-12" style={{paddingTop:"40px"}}>
                  <Button className="jr-btn text-uppercase btn-block" color="default" onClick={() => {submitCard()}}>등록하기</Button>
                </div>

                <FindEmployee 
                  open={this.state.findEmployeeOpen} 
                  handleSubComponentClose={this.handleFindEmployeeClose}
                  checkedEmployee={this.props.checkedEmployee}
                />
                <FindAccount
                  open={this.state.findAccountOpen}
                  handleFindAccountClose={this.handleFindAccountClose}
                  getAccountNo = {this.getAccountNo}
                />
                <SweetAlert 
                  show={this.state.success} 
                  success 
                  title="등록완료"
                  onConfirm={this.closeSuccessAlarm}
                  confirmBtnText="확인"
                  confirmBtnBsStyle="danger"
                  >
                  등록에 성공했습니다
                </SweetAlert>

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

              </form>
            </CardBox>
          </div>
        </Dialog>
      </div>
    );
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

  const mapStateToProps = ({ humanResource, code }) => {
    const { checkedEmployeeData } = humanResource;
    const { cardList, cardCategoryList } = code;

    return { checkedEmployeeData, cardList, cardCategoryList };
  }

export default connect(mapStateToProps, {checkedEmployee, getCodeList, addCard, cleanStoreState})(AddCard);
