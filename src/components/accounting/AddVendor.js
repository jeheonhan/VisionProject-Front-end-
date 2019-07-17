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
import { addVendor } from 'actions/Accounting';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

//import할 이름은 alias니 내 마음대로 이름을 바꿔도됨
class FullScreenDialog extends React.Component {
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
            <CardBox styleName="col-lg-4" heading="거래처 등록">
              <AddTextFields addVendor={this.props.addVendor}/>
            </CardBox>
          </div>
          
        </Dialog>
      </div>
    );
  }
}

export default connect(null, {addVendor})(FullScreenDialog);

//입력창
function AddTextFields(props) {

  const vendorList = [
    {
      vendorCategoryCodeNo: '01',
      vendorCategoryCodeName: '식자재',
    },
    {
      vendorCategoryCodeNo: '02',
      vendorCategoryCodeName: '가구',
    },
  ];
  
  const bankList = [
    {
      bankCodeNo: '01',
      bankCodeName: '우리은행',
    },
    {
      bankCodeNo: '02',
      bankCodeName: '국민은행',
    },
  ];

  //Hook이란 특별한 함수, useState는 Hook 중 하나인데 state를 함수 컴포넌트에서 사용할 수 있게 해준다.
  //Hook은 함수 컴포넌트에서 React의 특징을 갖게 해주는 함수. Hook은 항상 use라는 키워드로 시작
  //useState를 사용해서 values라는 변수를 선언한다. useState의 인자로 넘기는 것은 state의 초기값.
  //useState는 state 변수, 해당 변수를 갱신할 수 있는 함수 두 가지 쌍을 반환한다.
  //대괄호를 사용하는 문법은 "배열 구조 분해" 왼쪽의 변수는 사용하고 싶은 이름으로 변경가능. 배열구조분해라는 특별한 방법으로 변수를
  //선언해주었기 때문에 [0]이나 [1]로 배열에 접근하는 것은 좋지 않다.
  const [values, setValues] = useState({
    vendorName:"",
    representativeName:"",
    vendorTel:"",
    vendorPhone:"",
    vendorCategoryCodeNo:"",
    bankCodeNo:"",
    accountNo:"",
    accountHolder:""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    console.log(values);
  };

  const submitFn = () => {
      console.log(values);
      props.addVendor(values);

      setValues({
        vendorName:"",
        representativeName:"",
        vendorTel:"",
        vendorPhone:"",
        vendorCategoryCodeNo:"",
        bankCodeNo:"",
        accountNo:"",
        accountHolder:""
      });
  }

    return (
      <form className="row" noValidate autoComplete="off">
        <div className="col-md-12 col-12">
          <TextField
            id="vendorName"
            label="거래처명"
            placeholder="거래처명"
            value={values.vendorName}
            onChange={handleChange('vendorName')}
            margin="normal"
            fullWidth
          />
        </div>
        <div className="col-md-12 col-12">
          <TextField
            id="representativeName"
            label="대표자명"
            placeholder="거래처명"
            value={values.representativeName}
            onChange={handleChange('representativeName')}
            margin="normal"
            fullWidth
          />
        </div>
        <div className="col-md-12 col-12">
          <TextField
            id="vendorTel"
            label="거래처 전화번호"
            placeholder="거래처 전화번호"
            value={values.vendorTel}
            onChange={handleChange('vendorTel')}
            margin="normal"
            fullWidth
          />
        </div>
        <div className="col-md-12 col-12">
          <TextField
            id="vendorPhone"
            label="거래처 휴대폰번호"
            placeholder="거래처 휴대폰번호"
            value={values.vendorPhone}
            onChange={handleChange('vendorPhone')}
            margin="normal"
            fullWidth
          />
        </div>
        <div className="col-md-12 col-12">
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
              <MenuItem key={option.vendorCategoryCodeNo} value={option.vendorCategoryCodeNo}>
                {option.vendorCategoryCodeName}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-12 col-12">
          <TextField
            id="bankCodeNo"
            select
            label="은행 선택"
            value={values.bankCodeNo}
            onChange={handleChange('bankCodeNo')}
            SelectProps={{}}
            helperText="은행을 선택해 주세요"
            margin="normal"
            fullWidth
          >
            {bankList.map(option => (
              <MenuItem key={option.bankCodeNo} value={option.bankCodeNo}>
                {option.bankCodeName}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-12 col-12">
          <TextField
            id="accountNo"
            label="계좌번호"
            placeholder="계좌번호"
            value={values.accountNo}
            onChange={handleChange('accountNo')}
            margin="normal"
            fullWidth
          />
        </div>
        <div className="col-md-12 col-12">
          <TextField
            id="accountHolder"
            label="예금주명"
            placeholder="예금주명"
            value={values.accountHolder}
            onChange={handleChange('accountHolder')}
            margin="normal"
            fullWidth
          />
        </div>
     
        <div className="col-md-12 col-12">
          <Button className="jr-btn text-uppercase btn-block" color="default" onClick={() => {submitFn()}}>등록하기</Button>
        </div>
        
      </form>
    );
  
}
