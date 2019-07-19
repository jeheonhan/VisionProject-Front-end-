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
        vendorNo : this.props.vendor.vendorNo,
        vendorName : this.props.vendor.vendorName,
        representativeName : this.props.vendor.representativeName,
        vendorTel : this.props.vendor.vendorTel,
        vendorPhone : this.props.vendor.vendorPhone,
        vendorCategoryCodeNo : this.props.vendor.vendorCategoryCodeNo,
        //도메인 안에 도메인에 값을 넣으려면 그냥 보내면 안되고 inner json으로 보내야 한다.
        vendorAccount : {
          bankCodeNo : this.props.vendor.vendorAccount.bankCodeNo,
          accountNo : this.props.vendor.vendorAccount.accountNo,
          accountHolder : this.props.vendor.vendorAccount.accountHolder
        },
        zipCode : this.props.vendor.zipCode,
        address : this.props.vendor.address,
        detailAddress : this.props.vendor.detailAddress
      }
  }

  vendorList = [
    {
      vendorCategoryCodeNo: '01',
      vendorCategoryCodeName: '식자재',
    },
    {
      vendorCategoryCodeNo: '02',
      vendorCategoryCodeName: '가구',
    },
  ];
  
  bankList = [
    {
      bankCodeNo: '01',
      bankCodeName: '우리은행',
    },
    {
      bankCodeNo: '02',
      bankCodeName: '국민은행',
    },
  ];

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
    console.log(this.state);
    // props.addVendor(state);
    // props.handleRequestClose();
  }

  render() {
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
                  value={this.state.vendorNo}
                  onChange={this.handleChange('vendorNo')}
                  margin="normal"
                  fullWidth
                  disabled="true"
                />
              </div>
              
              <div className="col-md-8 col-8">
                <TextField
                  id="vendorName"
                  label="거래처명"
                  placeholder="거래처명"
                  value={this.state.vendorName}
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
                  value={this.state.representativeName}
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
                  value={this.state.vendorTel}
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
                  value={this.state.vendorPhone}
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
                  value={this.state.zipCode}
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
                  value={this.state.address}
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
                  value={this.state.detailAddress}
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
                  value={this.state.vendorCategoryCodeNo}
                  onChange={this.handleChange('vendorCategoryCodeNo')}
                  SelectProps={{}}
                  helperText="거래처를 분류해 주세요"
                  margin="normal"
                  fullWidth
                >
                  {this.vendorList.map(option => (
                    <MenuItem key={option.vendorCategoryCodeNo} value={option.vendorCategoryCodeNo}>
                      {option.vendorCategoryCodeName}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-8 col-8">
                <TextField
                  id="bankCodeNo"
                  select
                  label="은행 선택"
                  value={this.state.vendorAccount.bankCodeNo}
                  onChange={this.handleChange('bankCodeNo')}
                  SelectProps={{}}
                  helperText="은행을 선택해 주세요"
                  margin="normal"
                  fullWidth
                >
                  {this.bankList.map(option => (
                    <MenuItem key={option.bankCodeNo} value={option.bankCodeNo}>
                      {option.bankCodeName}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-8 col-8">
                <TextField
                  id="accountNo"
                  label="계좌번호"
                  placeholder="계좌번호"
                  value={this.state.vendorAccount.accountNo}
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
                  value={this.state.vendorAccount.accountHolder}
                  onChange={this.handleChange('accountHolder')}
                  margin="normal"
                  fullWidth
                />
              </div>
          
              <div className="col-md-8 col-8">
                <Button className="jr-btn text-uppercase btn-block" color="default" onClick={() => {this.submitFn()}}>등록하기</Button>
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