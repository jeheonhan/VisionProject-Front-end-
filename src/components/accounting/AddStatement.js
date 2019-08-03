import React from 'react';
import { connect } from 'react-redux';
import { getCodeList, addStatement } from 'actions/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker from '../date/DatePickers';
import FindAccount from 'components/accounting/FindAccount';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import SweetAlert from 'react-bootstrap-sweetalert';

class TradeAmountMask extends React.Component {
  render() {
    return (
      <NumberFormat
        {...this.props}
        thousandSeparator
        prefix="￦"
      />
    );
  }
}

TradeAmountMask.propTypes = {
  onChange: PropTypes.func.isRequired,
};

class AddStatement extends React.Component {
  state = {
    open: false,
    findAccountOpen: false,
    statement : {

    },
    success : false,
    
  };

  //전표등록 다이얼로그 열기
  handleClickOpen = () => {
    this.setState({open: true});
  };

  //전표등록 다이얼로그 닫기
  handleRequestClose = () => {
    this.setState({open: false, statement:''});
  };

  //계좌찾기 다이얼로그창 열기
  handleFindAccountOpen = () => {
    this.setState({findAccountOpen: true})
  };
    
  //계좌찾기 다이얼로그창 닫기
  handleFindAccountClose = () => {
    this.setState({findAccountOpen: false})
  }

  //Date Picker로부터 date정보 받는 call back function
  callBackDateChange = (date) => {
    this.setState({
        statement : { ...this.state.statement, tradeDate:date}
    });
  }

  //계좌번호 입력
  getAccountNo = (_accountNo) => {
    this.setState({
        statement : { ...this.state.statement, accountNo : _accountNo }
    })
  }

  //전표값 입력
  handleChange = name => event => {
      this.setState({
          statement : { ...this.state.statement, [name]: event.target.value }
      })
      console.log(this.state.statement)
  }

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

  //전표 등록
  submitStatement = (event) => {
    event.preventDefault();
    this.props.addStatement(this.state.statement)
    this.setState({ statement : '' })
    this.openSuccessAlarm();
  }

  render() {

    const { statementCategoryList } = this.props;

    if(statementCategoryList === undefined) {
        this.props.getCodeList({ searchKeyword : "statementCategory" });
    }

    return (
      <div>
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
          등록
        </Button>
        <Dialog open={this.state.open} onClose={this.handleRequestClose} maxWidth="lg">
          <DialogTitle>전표등록</DialogTitle>
          <DialogContent style={{minWidth: '700px', maxWidth: '700px'}}>
            <DialogContentText>
              내용을 빠진항목없이 입력 바랍니다.
            </DialogContentText>

              <div className="col-md-3 col-6" style={{float:"left"}}>
                <TextField
                  id="statementCategoryCodeNo"
                  select
                  label="전표구분 선택"
                  value={this.state.statement && this.state.statement.statementCategoryCodeNo}
                  onChange={this.handleChange('statementCategoryCodeNo')}
                  SelectProps={{}}
                  margin="none"
                  fullWidth={true}
                >
                {statementCategoryList && statementCategoryList.map(option => (
                  <MenuItem key={option.codeNo} value={option.codeNo}>
                      {option.codeName}
                  </MenuItem>
                ))}
                </TextField>
              </div>

              <div className="col-md-4 col-6" style={{float:"left"}}>
                <DatePicker callBackDateChange={this.callBackDateChange}></DatePicker>
              </div>

              <div className="col-md-5 col-6" style={{float:"left"}}>
                <TextField
                  id="tradeTargetName"
                  label="거래대상명"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  placeholder="거래대상명 입력"
                  value={this.state.statement && this.state.statement.tradeTargetName}
                  fullWidth={true}
                  margin="none"
                  onChange={this.handleChange('tradeTargetName')}
                />
              </div>

              <div className="col-md-6 col-6" style={{ float:"left" }}>
                <FormControl className="mb-3" fullWidth margin='normal'>
                  <InputLabel shrink={true} htmlFor="tradeAmount">공급가액</InputLabel>
                  <Input
                    inputComponent={TradeAmountMask}
                    id="tradeAmount"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    placeholder="숫자만 입력 가능합니다"
                    value={this.state.statement && this.state.statement.tradeAmount}
                    fullWidth={true}
                    margin="none"
                    onChange={this.handleChange('tradeAmount')}
                  />
                </FormControl>
              </div>

              <div className="col-md-6 col-6" style={{ marginTop:"15px", float:"left"}}>
                {/* 카드관리자와 관리자 번호는 직접 건들지 않아서 onChange를 안줘도 됨*/}
                <TextField
                  margin="none"
                  id="accountNo"
                  label="계좌번호"
                  helperText="항목을 클릭하여 계좌를 선택해주세요"
                  onClick={this.handleFindAccountOpen}
                  value={this.state.statement.accountNo}
                  fullWidth={true}
                />
              </div>

              <div className="col-md-9 col-6" style={{ marginTop:"5px", float:"left"}}>
                <TextField
                  id="statementDetail"
                  label="전표내용"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  placeholder="전표내용 입력"
                  helperText="전표 관련 내용을 간략히 입력해주세요"
                  value={this.state.statement && this.state.statement.statementDetail}
                  fullWidth
                  margin="none"
                  onChange={this.handleChange('statementDetail')}
                />
              </div>

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

          </DialogContent>
          <DialogActions>
            <Button onClick={ event => this.submitStatement(event)} color="secondary">
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
    const { statementCategoryList } = code;

    return { statementCategoryList }
}

export default connect(mapStateToProps, { getCodeList, addStatement })(AddStatement);