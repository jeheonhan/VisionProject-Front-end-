import React from 'react';
import { connect } from 'react-redux';
import { checkedEmployee, getCodeList, addCard  } from 'actions/index';
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
import FileBase64 from 'react-file-base64';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import FindEmployee from 'components/humanResource/FindEmployee';
import FindAccount from 'components/accounting/FindAccount';

class TextMaskCustom extends React.Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={[ /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/  ]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
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
      cardNo : '    -    -    -    ',
      open: false,
      findEmployeeOpen : false,
      findAccountOpen : false,
    }

  }

  //카드등록 다이얼로그창 띄우기
  handleClickOpen = () => {
    this.setState({open: true});
  };

  //카드등록 다이얼로그창 닫기
  handleRequestClose = () => {
    this.setState({open: false});
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

  //프로필 사진 업로드
  handleProfileImgUpload = (files) => {
    this.setState({cardImage:files})
  }

  getAccountNo = (_accountNo) => {
    this.setState({
      accountNo : _accountNo
    })
  }

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value });
    console.log(this.state);
  };
  

  
  render() {
    
    const { cardList, cardCategoryList } = this.props;
    
    //왜 굳이 const로 만들어서 줬지? 그냥 this.props로 줘도 되지 않나
    //this.props 하나로 다 받을 수 있어서 재사용성을 높을 듯?
    const { checkedEmployeeData } = this.props;
    
    if(cardList === undefined){
      this.props.getCodeList({ searchKeyword : "card" });
      this.props.getCodeList({ searchKeyword : "cardCategory" });
    }
 
    const submitCard = () => {
      
      this.props.addCard({
        cardManager : checkedEmployeeData.employeeNo,
        cardCategoryCodeNo : this.state.cardCategoryCodeNo,
        cardName : this.state.cardName,
        cardCompanyCodeNo : this.state.cardCompanyCodeNo,
        cardImage : "http://placehold.it/320x100",
        accountNo : this.state.accountNo,
        cardNo : this.state.cardNo,
      })
  
      this.handleRequestClose()
    }
    
    return (
      <div>
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
            등록
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleRequestClose}
          TransitionComponent={Transition}
        >
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
            <CardBox styleName="col-lg-6" heading="카드 등록">
              <form className="row" noValidate autoComplete="off">

                {/* <div className="col-md-8 col-12" >
                  <CardBox 
                          childrenStyle="d-flex justify-content-center"
                          heading={""}>
                    <Tooltip id="tooltip-icon" title="Hello" placement="bottom">
                      <Avatar className="size-100" alt="Remy Sharp" src={profileImage && `${profileImage.base64}`}/>
                    </Tooltip>
                  </CardBox>
                </div>               */}

                <div className="col-lg-8 col-sm-6 col-12">
                  <FormControl className="mb-3" fullWidth>
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
                      />
                        <FormHelperText>카드번호를 정확히 입력해주세요</FormHelperText>
                  </FormControl>
                </div>
                <div className="col-lg-8 col-sm-6 col-12">
                  <TextField
                    id="cardName"
                    label="카드명"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="카드명"
                    helperText="카드명을 입력해주세요"
                    value={this.state.cardName}
                    fullWidth
                    margin="normal"
                    onChange={this.handleChange('cardName')}
                  />
                </div>
                <div className="col-md-8 col-12">
                  <TextField
                    id="cardCompanyCodeNo"
                    select
                    label="카드사 구분"
                    value={this.state.cardCompanyCodeNo}
                    SelectProps={{}}
                    helperText="카드사를 선택해 주세요"
                    margin="normal"
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
                <div className="col-md-8 col-12">
                    <TextField
                        id="cardCategoryCodeNo"
                        select
                        label="카드종류 구분"
                        value={this.state.cardCategoryCodeNo}
                        SelectProps={{}}
                        helperText="카드종류를 선택해주세요"
                        margin="normal"
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
                <div className="col-md-8 col-12">
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
                <div className="col-md-8 col-12">
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
                <div className="col-md-8 col-12">
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

                <div style={{display:""}} >
                  프로필 사진
                  <FileBase64 
                    multiple={false}
                    onDone = {this.props.handleProfileImgUpload}/>
                </div>

                <div className="col-md-12 col-12">
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


              </form>
            </CardBox>
          </div>
        </Dialog>
      </div>
    );
  }
}

  const mapStateToProps = ({ humanResource, code }) => {
    const { checkedEmployeeData } = humanResource;
    const { cardList, cardCategoryList } = code;

    return { checkedEmployeeData, cardList, cardCategoryList };
  }


export default connect(mapStateToProps, {checkedEmployee, getCodeList, addCard})(AddCard);
