import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import CardBox from 'components/CardBox';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { addVendor, getCodeList } from 'actions/index';
import GetPostCode from 'components/accounting/GetPostCode'
import MaskedInput from 'react-text-mask';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';  
import SweetAlert from 'react-bootstrap-sweetalert';

//지역전화번호코드
const localPhoneCode = [
  { value: '02', label: '02', }, { value: '051', label: '051', }, { value: '053', label: '053', },
  { value: '032', label: '032', }, { value: '062', label: '062', }, { value: '042', label: '042', },
  { value: '052', label: '052', }, { value: '044', label: '044', }, { value: '031', label: '031', }, 
  { value: '033', label: '033', }, { value: '043', label: '043', }, { value: '041', label: '041', },
  { value: '063', label: '063', }, { value: '061', label: '061', }, { value: '054', label: '054', },
  { value: '055', label: '055', }, { value: '064', label: '064', },
];


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

//거래처 휴대폰번호 정규식
class vendorPhoneMask extends React.Component {
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

//거래처 서울 전화번호 정규식
class vendorTelSeoulMask extends React.Component {
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

//거래처 지방 전화번호 정규식
class vendorTelLocalMask extends React.Component {
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


//import할 이름은 alias니 내 마음대로 이름을 바꿔도됨
class AddVendor extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  render() {

    const { bankList, vendorList } = this.props;
    if(bankList === undefined){
      this.props.getCodeList({ searchKeyword : "bank" });
      this.props.getCodeList({ searchKeyword : "vendor" });
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
            <Toolbar className="bg-deep-orange">
              <Typography variant="title" color="inherit" style={{
                flex: 1,
              }}>
                거래처 등록
              </Typography>
              <Button onClick={this.handleRequestClose} color="inherit">
                닫기
              </Button>
            </Toolbar>
          </AppBar>
          
          <p/>
            
          <div align="center">  
            <div>
              <img className="size-60" src={require("assets/images/VisionLogo.png")}/>
            </div>
            <CardBox styleName="col-lg-7">
              <AddTextFields 
                bankList={ bankList && bankList } 
                vendorList={ vendorList && vendorList } 
                handleRequestClose={this.handleRequestClose }
                addVendor={this.props.addVendor }/>
            </CardBox>
          </div>
          
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({code}) => {
  const { bankList, vendorList } = code;
  return { bankList, vendorList };
}

export default connect(mapStateToProps, {addVendor, getCodeList})(AddVendor);

//입력창
function AddTextFields(props) {
  
  //const 선언시에는 []가 필요하지만, 값을 대입할때는 다 받기때문에 안써도 무방하다.
  //const는 뒤에 오는 값을 알아서 판별해서 대입하기 때문에 다 받을 수 있다.
  const { vendorList, bankList } = props;

  //DOM 객체에 접근하여 특정 컴포넌트 정보를 얻어오는 것이 ref. class 컴포넌트와 함수 컴포넌트에 따라
  //사용방법이 다르다. 함수 컴포넌트에는 useRef를 선언하며 변수명을 특정 컴포넌트에 부여하여 사용한다.
  // <div style={{display:"none"}}>
  //   <GetPostCode getPostcode={props.handleAddress} ref={post}></GetPostCode>
  // </div>
  const post = React.useRef();

  //Hook이란 특별한 함수, useState는 Hook 중 하나인데 state를 함수 컴포넌트에서 사용할 수 있게 해준다.
  //Hook은 함수 컴포넌트에서 React의 특징을 갖게 해주는 함수. Hook은 항상 use라는 키워드로 시작
  //useState를 사용해서 values라는 변수를 선언한다. useState의 인자로 넘기는 것은 state의 초기값.
  //useState는 state 변수, 해당 변수를 갱신할 수 있는 함수 두 가지 쌍을 반환한다.
  //대괄호를 사용하는 문법은 "배열 구조 분해" 왼쪽의 변수는 사용하고 싶은 이름으로 변경가능. 배열구조분해라는 특별한 방법으로 변수를
  //선언해주었기 때문에 [0]이나 [1]로 배열에 접근하는 것은 좋지 않다.
  const [values, setValues] = useState({
    vendorName : "",
    representativeName :"",
    localPhoneCode : "02", 
    vendorTel : "",
    vendorPhone : "",
    vendorCategoryCodeNo : "",
    //도메인 안에 도메인에 값을 넣으려면 그냥 보내면 안되고 inner json으로 보내야 한다.
    vendorAccount : {
      bankCodeNo : "",
      accountNo : "",
      accountHolder : ""
    },
    zipCode : "",
    address : "",
    detailAddress : "",
    success : false,
  });

  //inner json을 입력하려면 우선 임시방편으로 else if로 사용해서 직접 nested json에 넣는 수 밖에 없을듯
  const handleChange = name => event => {
    if(name === 'bankCodeNo'){
      setValues({...values, vendorAccount:{...values.vendorAccount, [name]:event.target.value}})
    }else if(name === 'accountNo'){
      setValues({...values, vendorAccount:{...values.vendorAccount, [name]:event.target.value}})
    }else if(name === 'accountHolder'){
      setValues({...values, vendorAccount:{...values.vendorAccount, [name]:event.target.value}})
    }else if(name === 'localPhoneCode'){
      setValues({ ...values, vendorTel:'', [name]: event.target.value})
    }else{
      setValues({ ...values, [name]: event.target.value });

    }
    console.log(values);
  };

  //우편번호 창 열기 [ref로 자식 컴포넌트 직접 접근하여 자식컴포넌트의 function을 사용]
  const handlePostOpen = () => {
    post.current.handleClickOpen();
  }

  //가져온 우편번호, 주소 값 저장
  const handlePostcode = (zipCode, address) => {
    setValues({
      ...values,
      zipCode : zipCode,
      address : address
    })
  };

  //거래처 등록하기
  const submitFn = () => {
      props.addVendor(values);
      openSuccessAlarm();
  }

  //등록성공알람 켜기
  const openSuccessAlarm = () => {
    setValues({
      ...values,
      success : true
    })
  }

  //등록성공알람 끄기
  const closeSuccessAlarm = () => {
    setValues({
      ...values,
      success : false
    })
    props.handleRequestClose();
  }

    return (
      <form className="row" noValidate autoComplete="off">
        <div  className="col-md-12 col-6">
          <br/>
            <Typography align="left" variant="h6" color="textPrimary" style={{
              flex: 1,
              float:"initial",
              paddingLeft:"15px",
              display:"block",
            }}>
              거래처 정보를 입력해주세요
            </Typography>
          <br/>
        </div>

        <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
          <TextField
            id="vendorName"
            label="거래처명"
            placeholder="거래처명 입력"
            value={values.vendorName}
            onChange={handleChange('vendorName')}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </div>
        <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
          <TextField
            id="representativeName"
            label="대표자명"
            placeholder="대표자명 입력"
            value={values.representativeName}
            onChange={handleChange('representativeName')}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </div>
        <div className="col-md-2 col-6" style={{float:"left", display:"inline"}}>
          <TextField
            id="localPhoneCode"
            select
            label="지역번호"
            value={values.localPhoneCode}
            onChange={handleChange('localPhoneCode')}
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
        <div className="col-md-4 col-6" style={{paddingLeft:"0px", float:"left", display:"inline"}}>
          <FormControl className="mb-3" fullWidth margin='normal'>
            <InputLabel htmlFor="vendorTel">거래처 전화번호</InputLabel>
              <Input
                id="vendorTel"
                value={values.vendorTel}
                inputComponent={values.localPhoneCode === '02' ? vendorTelSeoulMask : vendorTelLocalMask}
                className="w-100 mb-3"
                inputProps={{
                'aria-label': 'Description',
                }}
                onChange={handleChange('vendorTel')}
                placeholder="숫자만 입력 가능합니다"
                
              />
          </FormControl>
        </div>
        <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
          <FormControl className="mb-3" fullWidth margin='normal'>
            <InputLabel htmlFor="vendorPhone">거래처 휴대폰번호</InputLabel>
              <Input
                id="vendorPhone"
                value={values.vendorPhone}
                inputComponent={vendorPhoneMask}
                className="w-100 mb-3"
                inputProps={{
                'aria-label': 'Description',
                }}
                onChange={handleChange('vendorPhone')}
                placeholder="숫자만 입력 가능합니다"
                
              />
          </FormControl>
        </div>

        <div style={{display:"none"}}>
          <GetPostCode getPostcode={ handlePostcode } ref={post}/>
        </div>

        <div className="col-md-2 col-6" style={{float:"left", display:"inline"}}>
          <TextField
            id="zipCode"
            label="우편번호"
            placeholder="클릭해주세요"
            value={values.zipCode}
            onClick={handlePostOpen}
            // onChange={handleChange('zipCode')}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            fullWidth
          />

        </div>
        <div className="col-md-10 col-6" style={{float:"left", display:"inline"}}>
          <TextField
            id="address"
            label="주소"
            placeholder="클릭해주세요"
            value={values.address}
            onClick={handlePostOpen}
            // onChange={handleChange('address')}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            fullWidth
          />
        </div>
        
        <div className="col-md-12 col-6" style={{float:"left", display:"inline"}}>
          <TextField
            id="detailAddress"
            label="상세주소"
            placeholder="상세주소를 입력해주세요"
            value={values.detailAddress}
            onChange={handleChange('detailAddress')}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            fullWidth
          />
        </div>

        <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
          <TextField
            id="vendorCategoryCodeNo"
            select
            label="거래처 분류"
            value={values.vendorCategoryCodeNo}
            onChange={handleChange('vendorCategoryCodeNo')}
            SelectProps={{}}
            helperText="거래처를 분류해 주세요"
            margin="normal"
            fullWidth
          >
            {vendorList.map(option => (
              <MenuItem key={option.codeNo} value={option.codeNo}>
                {option.codeName}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
          <TextField
            id="bankCodeNo"
            select
            label="은행 선택"
            value={values.vendorAccount.bankCodeNo}
            onChange={handleChange('bankCodeNo')}
            SelectProps={{}}
            helperText="은행을 선택해 주세요"
            margin="normal"
            fullWidth
          >
            {bankList.map(option => (
              <MenuItem key={option.codeNo} value={option.codeNo}>
                {option.codeName}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
          <TextField
            id="accountNo"
            label="계좌번호"
            placeholder="숫자만 입력 가능합니다"
            value={values.vendorAccount.accountNo}
            onChange={handleChange('accountNo')}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            helperText="- 는 제외하고 입력해주세요"
          />
        </div>
        <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
          <TextField
            id="accountHolder"
            label="예금주명"
            placeholder="예금주명 입력"
            value={values.vendorAccount.accountHolder}
            onChange={handleChange('accountHolder')}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            fullWidth
          />
        </div>
     
        <div className="col-md-12 col-12" style={{paddingTop:"40px"}}>
          <Button 
            className="jr-btn text-uppercase btn-block" 
            color="default" 
            onClick={() => {submitFn()}}
            size="large"
          >
            등록하기
          </Button>
        </div>

        <SweetAlert 
          show={values.success} 
          success 
          title="등록완료"
          onConfirm={closeSuccessAlarm}
          confirmBtnText="확인"
          confirmBtnBsStyle="danger"
          >
          등록에 성공했습니다
        </SweetAlert>
        
      </form>
    );
  
}
