import React from 'react';
import { connect } from 'react-redux';
import { getCodeList, addAccount } from 'actions/index';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import SweetAlert from 'react-bootstrap-sweetalert';

class AddAccount extends React.Component {
  state = {
    open: false,
    accountRegNo : "",
    accountNo : "",
    accountUsageStatusCodeNo : "",
    accountHolder : "",
    bankCodeNo : "",
    bankCodeName : "",
    reference : "",
    accountCategoryCodeNo : "",
    accountCategoryCodeName : "",
    success : false,
  };

  //계좌등록 다이얼로그 열기
  handleClickOpen = () => {
    this.setState({open: true});
  };

  //게좌등록 다이얼로그 닫기
  handleRequestClose = () => {
    this.setState({open: false});
  };

  //계좌등록 위해 필요한 값 셋팅
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(this.state);
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
  

  //계좌등록
  submitAccount = (event) => {
    event.preventDefault();
    
    this.props.addAccount({
        accountNo : this.state.accountNo,
        accountHolder : this.state.accountHolder,
        bankCodeNo : this.state.bankCodeNo,
        reference : this.state.reference,
        accountCategoryCodeNo : this.state.accountCategoryCodeNo,
    })
    this.setState({
      accountRegNo : "",
      accountNo : "",
      accountUsageStatusCodeNo : "",
      accountHolder : "",
      bankCodeNo : "",
      bankCodeName : "",
      reference : "",
      accountCategoryCodeNo : "",
      accountCategoryCodeName : "",
    });

    this.openSuccessAlarm();
  }

  render() {

    const { bankList, accountCategoryList } = this.props;

    if(accountCategoryList === undefined) {
        this.props.getCodeList({ searchKeyword : "bank" });
        this.props.getCodeList({ searchKeyword : "accountCategory" });
    }

    return (
      <div>
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
            등록
        </Button>
        <Dialog open={this.state.open} onClose={this.handleRequestClose} maxWidth="lg">
          <DialogTitle>계좌등록</DialogTitle>
            <DialogContent style={{minWidth: '700px', maxWidth: '700px'}}>
              <DialogContentText>
                내용을 빠진항목없이 입력 바랍니다.
              </DialogContentText>
                <form className="row" noValidate autoComplete="off">

                  <div className="col-md-3 col-6" style={{float:"left"}}>
                    <TextField
                        id="bankCodeNo"
                        select
                        label="은행 선택"
                        value={this.state.bankCodeNo}
                        onChange={this.handleChange('bankCodeNo')}
                        SelectProps={{}}
                        margin="normal"
                        fullWidth={true}
                    >
                    {bankList && bankList.map(option => (
                      <MenuItem key={option.codeNo} value={option.codeNo}>
                          {option.codeName}
                      </MenuItem>
                    ))}
                    </TextField>
                  </div>

                  <div className="col-md-4 col-6" style={{float:"left"}}>
                    <TextField
                        id="accontHolder"
                        label="예금주명"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        placeholder="예금주명 입력"
                        value={this.state.accountHolder}
                        margin="normal"
                        onChange={this.handleChange('accountHolder')}
                        fullWidth={true}
                    />
                  </div>

                  <div className="col-md-5 col-6" style={{float:"left"}}>
                    <TextField
                        id="accontNo"
                        label="계좌번호"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        placeholder="계좌번호 입력"
                        value={this.state.accountNo}
                        margin="normal"
                        onChange={this.handleChange('accountNo')}
                        fullWidth={true}
                        helperText="- 를 제외하고 입력해주세요"
                    />
                  </div>

 

                  <div className="col-md-3 col-6" style={{float:"left"}}>
                    <TextField
                        id="accountCategoryCodeNo"
                        select
                        label="사용처 선택"
                        value={this.state.accountCategoryCodeNo}
                        onChange={this.handleChange('accountCategoryCodeNo')}
                        SelectProps={{}}
                        margin="normal"
                        fullWidth={true}
                    >
                    {accountCategoryList && accountCategoryList.map(option => (
                      <MenuItem key={option.codeNo} value={option.codeNo}>
                          {option.codeName}
                      </MenuItem>
                    ))}
                    </TextField>
                  </div>

                  <div className="col-md-9 col-6" style={{float:"left"}}>
                    <TextField
                        id="reference"
                        label="참고"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        placeholder="참고를 입력하세요"
                        helperText="계좌 검색시 사용할 키워드를 입력해주세요"
                        value={this.state.reference}
                        margin="normal"
                        onChange={this.handleChange('reference')}
                        fullWidth={true}
                    />
                  </div>

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

                </form>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={(event) => {this.submitAccount(event)}}>
                등록
              </Button>
              <Button onClick={this.handleRequestClose} color="primary">
                닫기
              </Button>
            </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ code }) => {
    const { bankList, accountCategoryList } = code;

    return { bankList, accountCategoryList };
}

export default connect(mapStateToProps, { getCodeList, addAccount })(AddAccount);