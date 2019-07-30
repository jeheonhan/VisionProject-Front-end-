import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GetPostCode from 'components/accounting/GetPostCode'
import MenuItem from '@material-ui/core/MenuItem';
import { updateVendor, cleanStoreState,getCodeList } from 'actions/index'
import { connect } from 'react-redux';

import MaskedInput from 'react-text-mask';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input'

//지역전화번호코드
const localPhoneCode = [
  { value: '02', label: '02', }, { value: '051', label: '051', }, { value: '053', label: '053', },
  { value: '032', label: '032', }, { value: '062', label: '062', }, { value: '042', label: '042', },
  { value: '052', label: '052', }, { value: '044', label: '044', }, { value: '031', label: '031', }, 
  { value: '033', label: '033', }, { value: '043', label: '043', }, { value: '041', label: '041', },
  { value: '063', label: '063', }, { value: '061', label: '061', }, { value: '054', label: '054', },
  { value: '055', label: '055', }, { value: '064', label: '064', },
];

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

class UpdateVendor extends React.Component {

  //constructor에서 super(props)를 호출한 이유는 우리가 컴포넌트를 만들게 되면서, Component를 상속했으며,
  //우리가 이렇게 constructor를 작성하게 되면 기존의 클래스 생성자를 덮어쓰게 됩니다. 그렇기에, 리액트 컴포넌트가
  //지니고 있던 생성자를 super를 통하여 미리 실행하고 그 다음에 우리가 할 작업(state 설정)을 해주는 것이다.
  constructor(props){

      super(props);
      this.post = React.createRef();
      this.state = {
        
        updateFlag : false,
      }
  }

  handleChange = name => event => {
    if(name === 'bankCodeNo'){
      //여기 같은 경우는 조금 복잡한데 key : value, key:{ value, key:value}
      //브레이스 안에서는 ,를 다시 사용할 수 있다.
      this.setState({ vendor : { ...this.state.vendor, vendorAccount : { ...this.state.vendor.vendorAccount, [name]:event.target.value }}})
    }else if(name === 'accountNo'){
      this.setState({ vendor : { ...this.state.vendor, vendorAccount : { ...this.state.vendor.vendorAccount, [name]:event.target.value }}})
    }else if(name === 'accountHolder'){
      this.setState({ vendor : { ...this.state.vendor, vendorAccount : { ...this.state.vendor.vendorAccount, [name]:event.target.value }}})
    }else if(name === 'localPhoneCode'){
      this.setState({ vendor :{ ...this.state.vendor, vendorTel : '' , [name]: event.target.value}} )
    }else{
      this.setState({ vendor: { ...this.state.vendor, [name]: event.target.value }});
    }
    console.log(this.state.vendor)
  };

    
  handlePostOpen = () => {
    this.post.current.handleClickOpen();
  }

  handlePostcode = (_zipCode, _address) => {
    this.setState({
      //setState는 key : { value, key:value, key:value} 
      vendor : { ...this.state.vendor, address : _address, zipCode : _zipCode }
    })
      
  };

  submitFn = () => {
    this.props.updateVendor(this.state.vendor);
    this.setState({ updateFlag : false });
    this.props.cleanStoreState('vendorInfo');
    this.props.close();
  }

  //다이얼로그 닫기
  closeUpdateVendor = (event) => {
    event.preventDefault();
    this.setState({ updateFlag : false })
    this.props.cleanStoreState('vendorInfo');
    //cleanStoreState를 하면 리듀서에서 null로 넣었기 때문에 Store에서 해당 key의 값을 null로 만든다.
    //clean을 하는 이유는 나갈때 setState가 되면서 re rendering이 이뤄지는데 이때 변한값과 원래 값이 일치하지 않아서
    //flag를 true로 만들어 버려 원래값을 저장시키고 flag를 true 상태로 바꿔버려 논리가 엉키게된다.
    this.props.close();
  }

  render() {

    
    const { vendorList, bankList, vendorInfo } = this.props;
    
    if(bankList === undefined){
      this.props.getCodeList({ searchKeyword : "bank" });
      this.props.getCodeList({ searchKeyword : "vendor" });
    }

    if( !this.state.updateFlag) {
      //null과 undefined는 다르다!
      if(this.state.vendor !== vendorInfo && vendorInfo !== null){
          this.setState({
              updateFlag : true, 
              vendor : vendorInfo
          });
      }
    }

    return (
      <div>
        <Dialog open={this.props.open} onClose={this.closeUpdateVendor}>
          <DialogTitle align="center">거래처 수정</DialogTitle>
          <DialogContent align="right" style={{minWidth: '580px', maxWidth: '580px', minHeight:'560px', maxHeight:'560px'}}>
            <form className="row" noValidate autoComplete="off" align="center">
            
              <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
                <TextField
                  id="vendorName"
                  label="거래처명"
                  placeholder="거래처명 입력"
                  value={this.state.vendor && this.state.vendor.vendorName}
                  onChange={this.handleChange('vendorName')}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
                <TextField
                  id="representativeName"
                  label="대표자명"
                  placeholder="대표자명"
                  value={this.state.vendor && this.state.vendor.representativeName}
                  onChange={this.handleChange('representativeName')}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-2 col-6" style={{float:"left", display:"inline"}}>
                <TextField
                  id="localPhoneCode"
                  select
                  label="지역"
                  value={this.state.vendor && this.state.vendor.localPhoneCode}
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
              <div className="col-md-4 col-6" style={{paddingLeft:"0px", float:"left", display:"inline"}}>
                <FormControl className="mb-3" fullWidth margin='normal'>
                  <InputLabel shrink={true} htmlFor="vendorTel">거래처 전화번호</InputLabel>
                    <Input
                      id="vendorTel"
                      value={this.state.vendor && this.state.vendor.vendorTel}
                      inputComponent={this.state.vendor && this.state.vendor.localPhoneCode === '02' ? vendorTelSeoulMask : vendorTelLocalMask}
                      className="w-100 mb-3"
                      inputProps={{
                      'aria-label': 'Description',
                      }}
                      onChange={this.handleChange('vendorTel')}
                      placeholder="숫자만 입력 가능합니다"
                    />
                </FormControl>
              </div>
              <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
                <FormControl className="mb-3" fullWidth margin='normal'>
                  <InputLabel shrink={true} htmlFor="vendorPhone">거래처 휴대폰번호</InputLabel>
                    <Input
                      id="vendorPhone"
                      value={this.state.vendor && this.state.vendor.vendorPhone}
                      inputComponent={vendorPhoneMask}
                      className="w-100 mb-3"
                      inputProps={{
                      'aria-label': 'Description',
                      }}
                      onChange={this.handleChange('vendorPhone')}
                      placeholder="숫자만 입력 가능합니다"
                      
                    />
                </FormControl>
              </div>

              <div style={{display:"none"}}>
                <GetPostCode getPostcode={ this.handlePostcode } ref={this.post}/>
              </div>


              <div className="col-md-3 col-6" style={{float:"left", display:"inline"}}>
                <TextField
                  id="zipCode"
                  label="우편번호"
                  placeholder="클릭해주세요"
                  value={this.state.vendor && this.state.vendor.zipCode}
                  onClick={this.handlePostOpen}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  fullWidth
                />
              </div>

              <div className="col-md-9 col-6" style={{paddingLeft:"0px", float:"left", display:"inline"}}>
                <TextField
                  id="address"
                  label="주소"
                  placeholder="클릭해주세요"
                  value={this.state.vendor && this.state.vendor.address}
                  onClick={this.handlePostOpen}
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
                  value={this.state.vendor && this.state.vendor.detailAddress}
                  onChange={this.handleChange('detailAddress')}
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
                  value={this.state.vendor && this.state.vendor.vendorCategoryCodeNo}
                  onChange={this.handleChange('vendorCategoryCodeNo')}
                  SelectProps={{}}
                  helperText="거래처를 분류해 주세요"
                  margin="normal"
                  fullWidth
                >
                  {vendorList && vendorList.map(option => (
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
                  value={this.state.vendor && this.state.vendor.vendorAccount.bankCodeNo}
                  onChange={this.handleChange('bankCodeNo')}
                  SelectProps={{}}
                  helperText="은행을 선택해 주세요"
                  margin="normal"
                  fullWidth
                >
                  {bankList && bankList.map(option => (
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
                  value={this.state.vendor && this.state.vendor.vendorAccount.accountNo}
                  onChange={this.handleChange('accountNo')}
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
                  value={this.state.vendor && this.state.vendor.vendorAccount.accountHolder}
                  onChange={this.handleChange('accountHolder')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  fullWidth
                />
              </div>
              
            </form>
              <Button
                variant="contained" 
                className="jr-btn bg-deep-orange text-white"
                onClick={() => {this.submitFn()}}
              >
                수정
              </Button>
              <Button 
                variant="contained" 
                className="jr-btn bg-deep-orange text-white"
                onClick={event => this.closeUpdateVendor(event)} 
              >
                닫기
              </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({accounting, code }) => {
  const { vendorInfo } = accounting;
  const { bankList, vendorList } = code;
  

  return { vendorInfo, bankList, vendorList };
}

export default connect(mapStateToProps, { updateVendor, cleanStoreState,getCodeList })(UpdateVendor);