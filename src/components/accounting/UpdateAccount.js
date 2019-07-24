import React from 'react';
import { connect } from 'react-redux';
import { getCodeList } from 'actions/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';


class UpdateAccount extends React.Component {
  
    state = {
        
        updateFlag : false
    }

    submitAccount = (event) => {
        event.preventDefault();

    }

    //계좌수정
    handleChange = name => event => {
        this.setState({
            account : { ...this.state.account, [name] : event.target.value}
        })
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
                updateFlag : false,
                account : accountInfo
            })
        }
    }

    return (
      <div>
        
        <Dialog open={this.props.open}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>

            <form className="row" noValidate autoComplete="off">
                    <div className="col-md-8 col-12">
                        <TextField
                            id="bankCodeNo"
                            select
                            label="은행 선택"
                            value={this.state.bankCodeNo}
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
                    <div className="col-lg-8 col-sm-6 col-12">
                        <TextField
                            id="accontNo"
                            label="계좌번호"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            placeholder="계좌번호"
                            helperText="계좌번호를 입력해주세요"
                            value={this.state.accountNo}
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange('accountNo')}
                        />
                    </div>
                    <div className="col-lg-8 col-sm-6 col-12">
                        <TextField
                            id="accontHolder"
                            label="예금주명"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            placeholder="예금주명"
                            helperText="예금주명을 입력해주세요"
                            value={this.state.accountHolder}
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange('accountHolder')}
                        />
                    </div>
                    <div className="col-lg-8 col-sm-6 col-12">
                        <TextField
                            id="reference"
                            label="참고"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            placeholder="참고"
                            helperText="계좌 검색시 사용할 키워드를 입력해주세요"
                            value={this.state.reference}
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange('reference')}
                        />
                    </div>
                    <div className="col-md-8 col-12" align="center">
                        <TextField
                            id="accountCategoryCodeNo"
                            select
                            label="사용처 선택"
                            value={this.state.accountCategoryCodeNo}
                            onChange={this.handleChange('accountCategoryCodeNo')}
                            SelectProps={{}}
                            helperText="사용처를 선택해 주세요"
                            margin="normal"
                            fullWidth
                        >
                        {accountCategoryList && accountCategoryList.map(option => (
                        <MenuItem key={option.codeNo} value={option.codeNo}>
                            {option.codeName}
                        </MenuItem>
                        ))}
                        </TextField>
                    </div>

                    <div className="col-md-12 col-12">
                        <Button className="jr-btn text-uppercase btn-block" color="default" onClick={(event) => {this.submitAccount(event)}}>수정하기</Button>
                    </div>
              </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={ event => this.closeUpdateAccount(event) } color="secondary">
              닫기
            </Button>
          </DialogActions>
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

export default connect(mapStateToProps, {getCodeList})(UpdateAccount);