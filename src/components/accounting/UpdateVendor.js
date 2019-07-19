import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GetPostCode from 'components/accounting/GetPostCode'
import MenuItem from '@material-ui/core/MenuItem';

class UpdateVendor extends React.Component {

  //constructor에서 super(props)를 호출한 이유는 우리가 컴포넌트를 만들게 되면서, Component를 상속했으며,
  //우리가 이렇게 constructor를 작성하게 되면 기존의 클래스 생성자를 덮어쓰게 됩니다. 그렇기에, 리액트 컴포넌트가
  //지니고 있던 생성자를 super를 통하여 미리 실행하고 그 다음에 우리가 할 작업(state 설정)을 해주는 것이다.
  constructor(props){

      super(props);

      this.state = {
        vendor : this.props.vendor,
      }
  }


  vendorList = this.props.vendorCodeList;
  bankList = this.props.bankCodeList;

  handleChange = name => event => {
    if(name === 'bankCodeNo'){
      this.setState({...this.state, vendorAccount:{...this.state.vendorAccount, [name]:event.target.value}})
    }else if(name === 'accountNo'){
      this.setState({...this.state, vendorAccount:{...this.state.vendorAccount, [name]:event.target.value}})
    }else if(name === 'accountHolder'){
      this.setState({...this.state, vendorAccount:{...this.state.vendorAccount, [name]:event.target.value}})
    }else{
      this.setState({ ...this.state, [name]: event.target.value });

    }
    console.log(this.state);
  };

  handlePostcode = (zipCode, address) => {
    this.setState({
      ...this.state,
      zipCode : zipCode,
      address : address
    })
  };

  submitFn = () => {
    alert("this is submitFn");
    console.log(this.state);
    this.props.updateVendor(this.state);
    this.props.close();
  }

  render() {
    if(this.state.vendor !== this.props.vendor){
      this.setState({
        vendor : this.props.vendor
      })
    }
    console.log("여기는 UpdateVendor");
    
    return (
      <div>
        <Dialog maxWidth={"xs"} open={this.props.open} onClose={this.updateVendorClose}>
          <DialogTitle align="center">거래처 수정</DialogTitle>
          <DialogContent align="right">
            <form className="row" noValidate autoComplete="off" align="center">
              
              <div className="col-md-8 col-8" >
                <TextField
                  id="vendorNo"
                  label="거래처번호"
                  placeholder="거래처번호"
                  value={this.state.vendor.vendorNo}
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
                  value={this.state.vendor.vendorName}
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
                  value={this.state.vendor.representativeName}
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
                  value={this.state.vendor.vendorTel}
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
                  value={this.state.vendor.vendorPhone}
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
                  value={this.state.vendor.zipCode}
                  onChange={this.handleChange('zipCode')}
                  margin="normal"
                  fullWidth
                />

              </div>
                <div className="col-md-8 col-8">
                <TextField
                  id="address"
                  label="주소"
                  placeholder="주소"
                  value={this.state.vendor.address}
                  onChange={this.handleChange('address')}
                  margin="normal"
                  fullWidth
                />
              </div>
              
              <div className="col-md-8 col-8">
                <TextField
                  id="detailAddress"
                  label="상세주소"
                  placeholder="상세주소"
                  value={this.state.vendor.detailAddress}
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
                  value={this.state.vendor.vendorCategoryCodeNo}
                  onChange={this.handleChange('vendorCategoryCodeNo')}
                  SelectProps={{}}
                  helperText="거래처를 분류해 주세요"
                  margin="normal"
                  fullWidth
                >
                  {this.vendorList.map(option => (
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
                  value={this.state.vendor.vendorAccount.bankCodeNo}
                  onChange={this.handleChange('bankCodeNo')}
                  SelectProps={{}}
                  helperText="은행을 선택해 주세요"
                  margin="normal"
                  fullWidth
                >
                  {this.bankList.map(option => (
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
                  value={this.state.vendor.vendorAccount.accountNo}
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
                  value={this.state.vendor.vendorAccount.accountHolder}
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
            <Button onClick={this.props.close} color="secondary">
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UpdateVendor;