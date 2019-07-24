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


class UpdateVendor extends React.Component {

  //constructor에서 super(props)를 호출한 이유는 우리가 컴포넌트를 만들게 되면서, Component를 상속했으며,
  //우리가 이렇게 constructor를 작성하게 되면 기존의 클래스 생성자를 덮어쓰게 됩니다. 그렇기에, 리액트 컴포넌트가
  //지니고 있던 생성자를 super를 통하여 미리 실행하고 그 다음에 우리가 할 작업(state 설정)을 해주는 것이다.
  constructor(props){

      super(props);

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
    }else{
      this.setState({ vendor: { ...this.state.vendor, [name]: event.target.value }});
    }
  };

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
        <Dialog maxWidth={"xs"} open={this.props.open} >
          <DialogTitle align="center">거래처 수정</DialogTitle>
          <DialogContent align="right">
            <form className="row" noValidate autoComplete="off" align="center">
              
              <div className="col-md-8 col-8" >
                <TextField
                  id="vendorNo"
                  label="거래처번호"
                  placeholder="거래처번호"
                  value={this.state.vendor && this.state.vendor.vendorNo}
                  onChange={this.handleChange('vendorNo')}
                  margin="normal"
                  fullWidth
                  disabled="true"
                  helperText="거래처 번호는 수정할 수 없습니다"
                />
              </div>
              
              <div className="col-md-8 col-8">
                <TextField
                  id="vendorName"
                  label="거래처명"
                  placeholder="거래처명"
                  value={this.state.vendor && this.state.vendor.vendorName}
                  onChange={this.handleChange('vendorName')}
                  margin="normal"
                  fullWidth
                  required="true"
                />
              </div>
              <div className="col-md-8 col-8">
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
              <div className="col-md-8 col-8">
                <TextField
                  id="vendorTel"
                  label="거래처 전화번호"
                  placeholder="거래처 전화번호"
                  value={this.state.vendor && this.state.vendor.vendorTel}
                  onChange={this.handleChange('vendorTel')}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-8 col-8">
                <TextField
                  id="vendorPhone"
                  label="거래처 휴대폰번호"
                  placeholder="거래처 휴대폰번호"
                  value={this.state.vendor && this.state.vendor.vendorPhone}
                  onChange={this.handleChange('vendorPhone')}
                  margin="normal"
                  fullWidth
                />
              </div>

              <div className="col-md-8 col-8">
                <GetPostCode getPostcode={ this.handlePostcode }/>
              </div>

              <div className="col-md-8 col-8">
                <TextField
                  id="zipCode"
                  label="우편번호"
                  placeholder="우편번호"
                  value={this.state.vendor && this.state.vendor.zipCode}
                  margin="normal"
                  fullWidth
                />

              </div>
                <div className="col-md-8 col-8">
                <TextField
                  id="address"
                  label="주소"
                  placeholder="주소"
                  value={this.state.vendor && this.state.vendor.address}
                  margin="normal"
                  fullWidth
                />
              </div>
              
              <div className="col-md-8 col-8">
                <TextField
                  id="detailAddress"
                  label="상세주소"
                  placeholder="상세주소"
                  value={this.state.vendor && this.state.vendor.detailAddress}
                  onChange={this.handleChange('detailAddress')}
                  margin="normal"
                  fullWidth
                />
              </div>

              <div className="col-md-8 col-8">
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
              <div className="col-md-8 col-8">
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
              <div className="col-md-8 col-8">
                <TextField
                  id="accountNo"
                  label="계좌번호"
                  placeholder="계좌번호"
                  value={this.state.vendor && this.state.vendor.vendorAccount.accountNo}
                  onChange={this.handleChange('accountNo')}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-8 col-8">
                <TextField
                  id="accountHolder"
                  label="예금주명"
                  placeholder="예금주명"
                  value={this.state.vendor && this.state.vendor.vendorAccount.accountHolder}
                  onChange={this.handleChange('accountHolder')}
                  margin="normal"
                  fullWidth
                />
              </div>
          
              <div className="col-md-8 col-8">
                <Button className="jr-btn text-uppercase btn-block" color="default" onClick={() => {this.submitFn()}}>수정하기</Button>
              </div>
              
            </form>
          </DialogContent>
          <DialogActions align="centery">
            <Button onClick={event => this.closeUpdateVendor(event)} color="secondary">
              닫기
            </Button>
          </DialogActions>
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