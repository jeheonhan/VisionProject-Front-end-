import React from 'react';
import { connect } from 'react-redux';
import { getCodeList, cleanStoreState, updateAccount } from 'actions/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from '@material-ui/core/MenuItem';
import SweetAlert from 'react-bootstrap-sweetalert';

class UpdateAccount extends React.Component {
  
    state = {
        success : false,
        updateFlag : false
    }

    //계좌수정 제출
    submitAccount = (event) => {
        event.preventDefault();
        this.props.updateAccount(this.state.account);
        this.setState({ updateFlag : false });
        this.props.cleanStoreState('accountInfo');
        this.openSuccessAlarm();
    }

    //계좌수정
    handleChange = name => event => {
        this.setState({
            account : { ...this.state.account, [name] : event.target.value}
        })
        console.log(this.state.account)
    }

    //계좌수정 다이얼로그 닫기
    closeUpdateAccount = (event) => {
        event.preventDefault();
        this.setState({ updateFlag : false});
        this.props.cleanStoreState('accountInfo');
        this.props.close();
    }

    //수정성공알람 켜기
    openSuccessAlarm = () => {
        this.setState({
        ...this.state,
        success : true
        })
    }

    //수정성공알람 끄기
    closeSuccessAlarm = () => {
        this.setState({
        ...this.state,
        success : false
        })
        this.props.close();
    }

    render() {

    const { bankList, accountCategoryList, accountInfo } = this.props;

    if(bankList === undefined && accountCategoryList === undefined) {
        this.props.getCodeList({ searchKeyword : "bank" });
        this.props.getCodeList({ searchKeyword : "accountCategory" });
    }

    if( !this.state.updateFlag ) {
        if(this.state.account !== accountInfo && accountInfo !== null) {
            this.setState({
                updateFlag : true,
                account : accountInfo
            })
        }
    }

    return (
      <div>
        
        <Dialog open={this.props.open} maxWidth="lg" onClose={ event => this.closeUpdateAccount(event) }>
          <DialogTitle>계좌수정</DialogTitle>
            <DialogContent style={{minWidth: '700px', maxWidth: '700px'}}>
               <DialogContentText>
                    빠진항목없이 입력 바랍니다.
                </DialogContentText>
                    <form className="row" noValidate autoComplete="off">
                        <div className="col-md-3 col-6" style={{float:"left"}}>
                            <TextField
                                id="bankCodeNo"
                                select
                                label="은행 선택"
                                value={this.state.account && this.state.account.bankCodeNo}
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
                                placeholder="예금주명"
                                value={this.state.account && this.state.account.accountHolder}
                                fullWidth={true}
                                margin="normal"
                                onChange={this.handleChange('accountHolder')}
                            />
                        </div>
                        <div className="col-md-5 col-6" style={{float:"left"}}>
                            <TextField
                                id="accontNo"
                                label="계좌번호"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                placeholder="계좌번호"
                                value={this.state.account && this.state.account.accountNo}
                                fullWidth={true}
                                margin="normal"
                                onChange={this.handleChange('accountNo')}
                            />
                        </div>

                        <div className="col-md-3 col-6" style={{float:"left"}}>
                            <TextField
                                id="accountCategoryCodeNo"
                                select
                                label="사용처 선택"
                                value={this.state.account && this.state.account.accountCategoryCodeNo}
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
                                placeholder="참고"
                                helperText="계좌 검색시 사용할 키워드를 입력해주세요"
                                value={this.state.account && this.state.account.reference}
                                fullWidth={true}
                                margin="normal"
                                onChange={this.handleChange('reference')}
                            />
                        </div>
                    </form>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={(event) => {this.submitAccount(event)}}>
                수정
            </Button>
            <Button onClick={ event => this.closeUpdateAccount(event) } color="primary">
                닫기
            </Button>
          </DialogActions>

          <SweetAlert 
            show={this.state.success} 
            success 
            title="수정완료"
            onConfirm={this.closeSuccessAlarm}
            confirmBtnText="확인"
            confirmBtnBsStyle="danger"
            >
            수정에 성공했습니다
        </SweetAlert>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ code, accounting }) => {
    const { bankList, accountCategoryList } = code;
    const { accountInfo } = accounting;

    return { bankList, accountCategoryList, accountInfo };
}

export default connect(mapStateToProps, {getCodeList, cleanStoreState, updateAccount})(UpdateAccount);