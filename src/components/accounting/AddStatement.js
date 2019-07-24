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

class AddStatement extends React.Component {
  state = {
    open: false,
    findAccountOpen: false,
    statement : {

    },
  };

  //전표등록 다이얼로그 열기
  handleClickOpen = () => {
    this.setState({open: true});
  };

  //전표등록 다이얼로그 닫기
  handleRequestClose = () => {
    this.setState({open: false});
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

  //전표 등록
  submitStatement = (event) => {
    event.preventDefault();
    this.props.addStatement(this.state.statement)
    this.handleRequestClose()
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
        <Dialog open={this.state.open}>
          <DialogTitle>전표등록</DialogTitle>
          <DialogContent>
            <DialogContentText>
              전표내용에는 어떤 것에 관한 전표인지 거래대상명에는 어떤 곳과 거래했는지 간략하게 기술 바랍니다
            </DialogContentText>
                <div className="col-md-8 col-12">
                    <TextField
                        id="statementCategoryCodeNo"
                        select
                        label="전표구분 선택"
                        value={this.state.statement && this.state.statement.statementCategoryCodeNo}
                        onChange={this.handleChange('statementCategoryCodeNo')}
                        SelectProps={{}}
                        helperText="전표구분을 선택해 주세요"
                        margin="normal"
                        fullWidth
                    >
                    {statementCategoryList && statementCategoryList.map(option => (
                    <MenuItem key={option.codeNo} value={option.codeNo}>
                        {option.codeName}
                    </MenuItem>
                    ))}
                    </TextField>
                </div>
                <div className="col-md-8 col-12">
                    <DatePicker callBackDateChange={this.callBackDateChange}></DatePicker>
                </div>
                <div className="col-lg-8 col-sm-6 col-12">
                    <TextField
                        id="tradeTargetName"
                        label="거래대상명"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="거래대상명"
                        helperText="거래대상명을 입력해주세요"
                        value={this.state.statement && this.state.statement.tradeTargetName}
                        fullWidth
                        margin="normal"
                        onChange={this.handleChange('tradeTargetName')}
                    />
                </div>
                <div className="col-lg-8 col-sm-6 col-12">
                    <TextField
                        id="tradeAmount"
                        label="공급가액"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        placeholder="공급가액"
                        helperText="공급가액을 입력해주세요"
                        value={this.state.statement && this.state.statement.tradeAmount}
                        fullWidth
                        margin="normal"
                        onChange={this.handleChange('tradeAmount')}
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
                    value={this.state.statement.accountNo}
                    fullWidth
                  />
                </div>
                <div className="col-lg-8 col-sm-6 col-12">
                    <TextField
                        id="statementDetail"
                        label="전표내용"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="전표내용"
                        helperText="전표내용을 입력해주세요"
                        value={this.state.statement && this.state.statement.statementDetail}
                        fullWidth
                        margin="normal"
                        onChange={this.handleChange('statementDetail')}
                    />
                </div>

                <FindAccount
                  open={this.state.findAccountOpen}
                  handleFindAccountClose={this.handleFindAccountClose}
                  getAccountNo = {this.getAccountNo}
                />

          </DialogContent>
          <DialogActions>
            <Button onClick={ event => this.submitStatement(event)} color="secondary">
              수정
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
              취소
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