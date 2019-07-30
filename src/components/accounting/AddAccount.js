import React from 'react';
import { connect } from 'react-redux';
import { getCodeList, addAccount } from 'actions/index';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CardBox from 'components/CardBox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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

    this.handleRequestClose()
  }

  render() {

    const { bankList, accountCategoryList } = this.props;

    if(bankList === undefined && accountCategoryList === undefined) {
        this.props.getCodeList({ searchKeyword : "bank" });
        this.props.getCodeList({ searchKeyword : "accountCategory" });
    }

    return (
      <div>
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
            등록
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          TransitionComponent={Transition}
        >
          <AppBar className="position-relative">
            <Toolbar>
              <Typography variant="title" color="inherit" style={{
                flex: 1,
              }}>
                계좌 등록
              </Typography>
              <Button onClick={this.handleRequestClose} color="inherit">
                닫기
              </Button>
            </Toolbar>
          </AppBar>

          <p/>

          <div align="center">  
            <CardBox styleName="col-lg-6" heading="계좌 등록">
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
                        <Button 
                          className="jr-btn text-uppercase btn-block"
                          size="large" 
                          color="default" 
                          onClick={(event) => {this.submitAccount(event)}}>
                          등록하기
                        </Button>
                    </div>
              </form>

            </CardBox>
          </div>
          
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