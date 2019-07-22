import React from 'react';
import { connect } from 'react-redux';
import { checkedEmployee, getCodeList, addCard  } from 'actions/index';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FileBase64 from 'react-file-base64';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import FindEmployee from 'components/humanResource/FindEmployee';
import FindAccount from 'components/accounting/FindAccount';


class TextMaskCustom extends React.Component {
    render() {
      return (
        <MaskedInput
          {...this.props}
          mask={[ /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/  ]}
          placeholderChar={'\u2000'}
          showMask
        />
      );
    }
}


class UpdateCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            card : this.props.card,
            updateFlag : false,
            
        }
    }

  //사원찾기 다이얼로그창 열기
  handleFindEmployeeOpen = () => {
    this.setState({findEmployeeOpen: true})
  }

  //사원찾기 다이얼로그창 닫기
  handleFindEmployeeClose = () => {
      this.setState({findEmployeeOpen: false})
  }

  //계좌찾기 다이얼로그창 열기
  handleFindAccountOpen = () => {
    this.setState({findAccountOpen: true})
  }

  //계좌찾기 다이얼로그창 닫기
  handleFindAccountClose = () => {
    this.setState({findAccountOpen: false})
  }

  //프로필 사진 업로드
  handleProfileImgUpload = (files) => {
    this.setState({cardImage:files})
  }

  getAccountNo = (_accountNo) => {
    this.setState({
        accountNo : _accountNo
    })
  }

  handleChange = name => event => {
    this.setState({...this.state, card:{...this.state.card, [name]: event.target.value} });
    console.log(this.state.card);
  };

  closeUpdateCard = (event) => {
    event.preventDefault();
    this.setState({ updateFlag : false })
    this.props.close();
  }

  render() {
        
        if(this.state.updateFlag == false && this.state.card !== this.props.card){
            this.setState({ card : this.props.card });
            this.setState({ updateFlag : true });
            console.log(this.state.updateFlag)
        }

        const { cardList, cardCategoryList } = this.props;
        

        const submitCard = () => {
            alert("hi")
            // this.props.addCard({
            // cardManager : checkedEmployeeData.employeeNo,
            // cardCategoryCodeNo : this.state.cardCategoryCodeNo,
            // cardName : this.state.cardName,
            // cardCompanyCodeNo : this.state.cardCompanyCodeNo,
            // cardImage : "http://placehold.it/320x100",
            // accountNo : this.state.accountNo,
            // cardNo : this.state.cardNo,
            // })
        }

      return (
        <div>
            <Dialog open={this.props.open}>
                <DialogTitle align="center">카드수정</DialogTitle>
                    <DialogContent align="right">
                        <form className="row" noValidate autoComplete="off">
                            {/* <div className="col-md-8 col-12" >
                            <CardBox 
                                    childrenStyle="d-flex justify-content-center"
                                    heading={""}>
                                <Tooltip id="tooltip-icon" title="Hello" placement="bottom">
                                <Avatar className="size-100" alt="Remy Sharp" src={profileImage && `${profileImage.base64}`}/>
                                </Tooltip>
                            </CardBox>
                            </div>               */}

                            <div className="col-lg-8 col-sm-6 col-12">
                                <FormControl className="mb-3" fullWidth>
                                    <InputLabel htmlFor="cardNo">카드번호</InputLabel>
                                        <Input
                                            id="cardNo"
                                            value={this.state.card.cardNo}
                                            inputComponent={TextMaskCustom}
                                            className="w-100 mb-3"
                                            inputProps={{
                                            'aria-label': 'Description',
                                            }}
                                            onChange={this.handleChange('cardNo')}
                                        />
                                        <FormHelperText>카드번호를 정확히 입력해주세요</FormHelperText>
                                </FormControl>
                            </div>

                            <div className="col-lg-8 col-sm-6 col-12">
                                <TextField
                                    id="cardName"
                                    label="카드명"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    placeholder="카드명"
                                    helperText="카드명을 입력해주세요"
                                    value={this.state.card.cardName}
                                    fullWidth
                                    margin="normal"
                                    onChange={this.handleChange('cardName')}
                                />
                            </div>

                            <div align="center" className="col-md-8 col-12">
                                <TextField
                                    id="cardCompanyCodeNo"
                                    select
                                    label="카드사 구분"
                                    value={this.state.card.cardCompanyCodeNo}
                                    SelectProps={{}}
                                    helperText="카드사를 선택해 주세요"
                                    margin="normal"
                                    fullWidth
                                    onChange={this.handleChange('cardCompanyCodeNo')}
                                >
                                {cardList && cardList.map(option => (
                                    <MenuItem key={option.codeNo} value={option.codeNo}>
                                        {option.codeName}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </div>

                            <div align="center" className="col-md-8 col-12">
                                <TextField
                                    id="cardCategoryCodeNo"
                                    select
                                    label="카드종류 구분"
                                    value={this.state.card.cardCategoryCodeNo}
                                    SelectProps={{}}
                                    helperText="카드종류를 선택해주세요"
                                    margin="normal"
                                    fullWidth
                                    onChange={this.handleChange('cardCategoryCodeNo')}
                                >
                                {cardCategoryList && cardCategoryList.map(option => (
                                    <MenuItem key={option.codeNo} value={option.codeNo}>
                                        {option.codeName}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </div>

                            <div className="col-md-8 col-12">
                                {/* 카드관리자와 관리자 번호는 직접 건들지 않아서 onChange를 안줘도 됨*/}
                                <TextField
                                    margin="normal"
                                    id="cardManager"
                                    label="카드관리자 사원번호"
                                    helperText="항목을 클릭하여 관리자를 선택해주세요"
                                    //사원번호 클릭시 자식컴포넌트 Open값을 true로 변경
                                    onClick={this.handleFindEmployeeOpen}
                                    onChange={this.handleChange('cardManager')}
                                    value={this.state.card.cardManager}
                                    fullWidth
                                />
                            </div>

                            <div className="col-md-8 col-12">
                                <TextField
                                    margin="normal"
                                    id="cardManagerName"
                                    label="카드관리자"
                                    helperText="항목을 클릭하여 관리자를 선택해주세요"
                                    onClick={this.handleFindEmployeeOpen}
                                    value={this.state.card.cardManagerName}
                                    fullWidth
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
                                    value={this.state.card.accountNo}
                                    fullWidth
                                />
                            </div>

                            <div className="col-md-8 col-12">
                                프로필 사진
                                <FileBase64 
                                    multiple={false}
                                    onDone = {this.props.handleProfileImgUpload}/>
                            </div>

                            <div className="col-md-12 col-12">
                                <Button className="jr-btn text-uppercase btn-block" color="default" onClick={() => {submitCard()}}>수정하기</Button>
                            </div>

                            <FindEmployee 
                                open={this.state.findEmployeeOpen} 
                                handleSubComponentClose={this.handleFindEmployeeClose}
                                checkedEmployee={this.props.checkedEmployee}
                            />
                            <FindAccount
                                open={this.state.findAccountOpen}
                                handleFindAccountClose={this.handleFindAccountClose}
                                getAccountNo = {this.getAccountNo}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions align="centery">
                        <Button onClick={ event => this.closeUpdateCard(event)} color="secondary">
                            닫기
                        </Button>
                    </DialogActions>
            </Dialog>
        </div>
      )//end of return
  }//end of render
}

const mapStateToprops = ({ humanResource }) => {
    const { checkedEmployeeData } = humanResource;
    
    return { checkedEmployeeData };
}


export default connect(mapStateToprops, {checkedEmployee})(UpdateCard);