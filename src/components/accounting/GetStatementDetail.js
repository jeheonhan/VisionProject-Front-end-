import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { getStatement } from 'actions/index';
import { Card, CardBody, CardSubtitle, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { compose } from 'redux';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { getCodeList, updateStatement } from 'actions/index';
import DatePicker from '../date/DatePickers';
import FindAccount from 'components/accounting/FindAccount';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';

class TradeAmountMask extends React.Component {
  render() {
    return (
      <NumberFormat
        {...this.props}
        thousandSeparator
      />
    );
  }
}

TradeAmountMask.propTypes = {
  onChange: PropTypes.func.isRequired,
};

function TabContainer({children, dir}) {
  return (
    <div dir={dir}>
      {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

class GetStatementDetail extends Component {

  state = {
    value: 0,
    updateFlag: false,
    findAccountOpen: false,
    user:JSON.parse(localStorage.getItem('user')),
    snackbar: false,
    snackbarContents: ''
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  handleChangeIndex = index => {
    this.setState({value: index});
  };

  //이전전표 가져오기
  getBeforeStatement = (event, statementNo) =>{
    event.preventDefault();
    //map의 index는 0부터 시작한다.
    this.props.statementList && this.props.statementList.map((statementObject, index) => {
      if(statementNo === statementObject.statementNo) {
        if(index-1 === -1){
          return this.props.getStatement(this.props.statementList[index].statementNo)  
        }
        this.props.getStatement(this.props.statementList[index-1].statementNo)
      }
    })
  }

  //다음전표 가져오기
  getNextStatement = (event, statementNo) =>{
    event.preventDefault();
    //map의 index는 0부터 시작한다.
    this.props.statementList && this.props.statementList.map((statementObject, index) => {
      if(statementNo === statementObject.statementNo) {
        if(index === (this.props.statementList.length-1)) {
          return this.props.getStatement(this.props.statementList[index].statementNo)
        }
        this.props.getStatement(this.props.statementList[index+1].statementNo)
      }
    })
  }

  //전표값 수정
  handleStatementChange = name => event => {
    this.setState({
        statement : { ...this.state.statement, [name]: event.target.value }
    })
    console.log(this.state.statement)
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

  //계좌찾기 다이얼로그창 열기
  handleFindAccountOpen = () => {
    this.setState({findAccountOpen: true})
  };
    
  //계좌찾기 다이얼로그창 닫기
  handleFindAccountClose = () => {
    this.setState({findAccountOpen: false})
  }

  //전표 상제조회 다이얼로그 닫기
  statementDetailClose = () => {
    this.setState({
      updateFlag : false
    })
    this.props.close();
  }

  //전표수정 요청
  submitStatement = event => {
    if(Number(this.state.user.rankCodeNo) > 1){
      event.preventDefault();
      this.props.updateStatement(this.state.statement); 
      this.setState({
        updateFlag : false
      })
      this.props.openUpdateSuccessAlarm();
    }else{
      this.handleRequestSnackBarOpen("해당 기능에 접근권한이 없습니다.")
    }

  }

  //스낵바 열기
  handleRequestSnackBarOpen = (contents) => {
    this.setState({
      snackbar:true,
      snackbarContents:contents
    })
  }

  //스낵바 닫기
  handleRequestClose = () => {
    this.setState({
      snackbar:false,
      snackbarContents:"",
      open: false
    })
  }
  
    

  render() {

    const { statementInfo, statementCategoryList, theme } = this.props;
    let modifyFlag = false;

    if(Number(this.state.user.rankCodeNo) > 1){
      modifyFlag = true;
    }else{
      modifyFlag = false;
    }

    if(statementCategoryList === undefined) {
        this.props.getCodeList({ searchKeyword : "statementCategory" });
    }

    if(!this.state.updateFlag) {
      console.log("flag 들어옴")
      if(this.state.statement !== statementInfo && statementInfo !== null) {
        this.setState({
          updateFlag : true,
          statement : statementInfo
        })
        console.log(statementInfo)
        console.log("statementInfo로 덮어씌움")
      }
      
    }

    return (
      <div>
        <Dialog open={this.props.open} onClose={this.statementDetailClose} maxWidth="xs">
        
        <Card>
        <AppBar className="bg-secondary card-header" position="static" style={{paddingTop: 22, height: 70}}>

          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            variant="fullWidth">
            <Tab className="tab" label="상세조회"/>
            <Tab className="tab" label="전표수정"/>
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}>

          <TabContainer dir={theme.direction}>
            <div>
              <CardBody>
                <h3 className="card-title">전표번호 : { statementInfo && statementInfo.statementNo}({ statementInfo && statementInfo.statementCategoryCodeName})</h3>
                <CardSubtitle>전표상세조회</CardSubtitle>
                <CardText>
                  거래일시 : {statementInfo && statementInfo.tradeDate}
                  <p/>
                  거래금액 : {statementInfo && statementInfo.tradeAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                  <p/>
                  거래 계좌번호 : {statementInfo && statementInfo.accountNo}
                </CardText>
                <CardText>
                  전표내용 : {statementInfo && statementInfo.statementDetail}
                  <p/>
                  거래대상 : {statementInfo && statementInfo.tradeTargetName} 
                </CardText>
              </CardBody>
              <hr/>
              <CardBody>
                <div style={{float:"left"}}> 
                  <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={ event => this.getBeforeStatement(event, statementInfo.statementNo) }>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                    Back
                  </Button>        
                </div>
                <div style={{float:"right"}}>
                  <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={ event => this.getNextStatement(event, statementInfo.statementNo) }>
                    Next
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                  </Button>
                </div>
              </CardBody>
            </div>
          </TabContainer>
          <TabContainer dir={theme.direction}>

                <div className="col-md-6 col-6" style={{float:"left", paddingTop:"20px"}}>
                  <TextField
                      id="statementCategoryCodeNo"
                      select
                      label="전표구분 선택"
                      value={this.state.statement && this.state.statement.statementCategoryCodeNo}
                      onChange={this.handleStatementChange('statementCategoryCodeNo')}
                      SelectProps={{}}
                      margin="none"
                      disabled={!modifyFlag}
                      fullWidth={true}
                  >
                  {statementCategoryList && statementCategoryList.map(option => (
                  <MenuItem key={option.codeNo} value={option.codeNo}>
                      {option.codeName}
                  </MenuItem>
                  ))}
                  </TextField>
                </div>

                <div className="col-md-6 col-6" style={{float:"left", paddingTop:"20px"}}>
                  <DatePicker value={this.state.statement && this.state.statement.tradeDate} callBackDateChange={this.callBackDateChange}
                              disabled={!modifyFlag}></DatePicker>
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
                        onChange={this.handleStatementChange('tradeAmount')}
                        disabled={!modifyFlag}
                        endAdornment={this.state.statement && this.state.statement.tradeAmount ? (<InputAdornment position="end">원</InputAdornment>) : null}
                      />
                  </FormControl>
                </div>

                <div className="col-md-6 col-6" style={{float:"left"}}>
                    {/* 카드관리자와 관리자 번호는 직접 건들지 않아서 onChange를 안줘도 됨*/}
                    <TextField
                      margin="normal"
                      id="accountNo"
                      label="계좌번호"
                      helperText="클릭하여 계좌 선택"
                      onClick={this.handleFindAccountOpen}
                      value={this.state.statement && this.state.statement.accountNo}
                      disabled={!modifyFlag}
                      fullWidth={true}
                    />
                </div>

                <div className="col-md-12 col-6" style={{float:"left", }}>
                  <TextField
                      id="tradeTargetName"
                      label="거래대상명"
                      InputLabelProps={{
                          shrink: true,
                      }}
                      placeholder="거래대상명 입력"
                      value={this.state.statement && this.state.statement.tradeTargetName}
                      margin="normal"
                      onChange={this.handleStatementChange('tradeTargetName')}
                      disabled={!modifyFlag}
                      fullWidth={true}
                  />
                </div>

                <div className="col-md-12 col-6" style={{float:"left",paddingBottom:"10px"}}>
                      <TextField
                          id="statementDetail"
                          label="전표내용"
                          InputLabelProps={{
                              shrink: true,
                          }}
                          placeholder="전표내용 입력"
                          helperText="전표 관련 내용을 간략히 입력해주세요"
                          value={this.state.statement && this.state.statement.statementDetail}
                          margin="normal"
                          onChange={this.handleStatementChange('statementDetail')}
                          disabled={!modifyFlag}
                          fullWidth={true}
                      />
                </div>

                <div className="col-md-12 col-6" style={{float:"left"}}>
                <div align="center" style={{display:"block"}}>
                    <Button className="jr-btn text-uppercase btn-block" color="default" onClick={(event) => {this.submitStatement(event)}}>수정하기</Button>
                </div>
                </div>

                <FindAccount
                  open={this.state.findAccountOpen}
                  handleFindAccountClose={this.handleFindAccountClose}
                  getAccountNo = {this.getAccountNo}
                />

          </TabContainer>
        </SwipeableViews>
        </Card>
        <Snackbar
            anchorOrigin={{vertical:'top', horizontal:'center'}}
            open={this.state.snackbar}
            autoHideDuration="1500"
            onClose={this.handleRequestClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.snackbarContents}</span>}
          />
        
        </Dialog>
      </div>
    );
  }
}

GetStatementDetail.propTypes = {
  theme: PropTypes.object.isRequired,
};

const mapStateToPrpos = ({ accounting, code }) => { 
  const { statementInfo, statementList } = accounting;
  const { statementCategoryList } = code;

  return { statementInfo, statementList, statementCategoryList };
}

export default compose( withStyles(null, {withTheme: true}), connect(mapStateToPrpos, { getCodeList, getStatement, updateStatement }))(GetStatementDetail);