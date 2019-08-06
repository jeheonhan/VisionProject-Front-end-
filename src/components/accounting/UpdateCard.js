import React from 'react';
import { connect } from 'react-redux';
import { checkedEmployee, getCodeList, cleanStoreState, updateCard } from 'actions/index';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FileBase64 from 'components/base64/react-file-base64';
import FormControl from '@material-ui/core/FormControl';
import FindEmployee from 'components/humanResource/FindEmployee';
import FindAccount from 'components/accounting/FindAccount';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InputLabel from '@material-ui/core/InputLabel';
import SweetAlert from 'react-bootstrap-sweetalert';

class TextMaskCustom extends React.Component {
    render() {
      return (
        <MaskedInput
          {...this.props}
          mask={[ /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/  ]}
          placeholderChar={'\u2000'}
          
        />
      );
    }
}

class UpdateCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            updateFlag : false,
            success : false,
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

    //프로필 파일업로드 화면 열기
    handleOnClickFileUpload = (e) => {
        document.getElementById('profileInputFile').click();
    }

    //프로필 사진 업로드
    handleProfileImgUpload = (files) => {
        this.setState({
            card :{...this.state.card, cardImageFile : files }
        })
    }

    //계좌번호 입력
    getAccountNo = (getAccountNo) => {
        this.setState({
            card : { ...this.state.card, accountNo : getAccountNo }
        })
    }

    //카드수정
    handleChange = name => event => {
        this.setState({ 
            card:{...this.state.card, [name]: event.target.value} 
        });
        console.log(this.state.card)
    };

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

    //카드수정 다이얼로그 닫기
    closeUpdateCard = (event) => {
        event.preventDefault();
        this.setState({ updateFlag : false });
        this.props.cleanStoreState('cardInfo');
        this.props.cleanStoreState("checkedEmployeeData");
        this.props.close();
    }

    render() {
        
        const { cardList, cardCategoryList, cardInfo, checkedEmployeeData } = this.props;
        
        //카드수정 제출
        const submitCard = (event) => {
            event.preventDefault();
            this.props.updateCard({
                cardRegNo : this.state.card.cardRegNo,
                cardManager : this.state.card.cardManager,
                cardCategoryCodeNo : this.state.card.cardCategoryCodeNo,
                cardName : this.state.card.cardName,
                cardCompanyCodeNo : this.state.card.cardCompanyCodeNo,
                cardImageFile : this.state.card.cardImageFile,
                accountNo : this.state.card.accountNo,
                cardNo : this.state.card.cardNo,
                cardImage : this.state.card.cardImage,
            });
            this.setState({ updateFlag : false });
            this.props.cleanStoreState('cardInfo');
            this.props.cleanStoreState("checkedEmployeeData");
            this.openSuccessAlarm();
        }

        //파일업로드용 makeStyles
        const classes = makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
        },
        leftIcon: {
          marginRight: theme.spacing(1),
        },
        rightIcon: {
          marginLeft: theme.spacing(1),
        },
        iconSmall: {
          fontSize: 20,
        },
      }));

    if(cardList === undefined){
      this.props.getCodeList({ searchKeyword : "card" });
      this.props.getCodeList({ searchKeyword : "cardCategory" });
    }

    if(!this.state.updateFlag) {
        if(this.state.card !== cardInfo && cardInfo !== null){
            this.setState({ 
                updateFlag : true, 
                card : cardInfo
            });
        }
    }

    if(this.state.updateFlag && checkedEmployeeData && checkedEmployeeData.employeeNo !== this.state.card.cardManager){
        this.setState({
            card : {
                ...this.state.card, 
                cardManager : checkedEmployeeData.employeeNo, 
                cardManagerName : checkedEmployeeData.employeeName
            }
        })
    }

    return (
    <div>
        <Dialog open={this.props.open} onClose={ event => this.closeUpdateCard(event)}>
            <DialogTitle align="center">카드수정</DialogTitle>
                <DialogContent>
                    <DialogContentText align="center">
                        <form className="row" noValidate autoComplete="off">

                            <div className="col-md-12 col-6" style={{float:"left"}}>
                            <br/><br/>
                                <div className="card-media card-img-top" style={{ paddingBottom:"30px"}}>
                                    <img src={ this.state.card && this.state.card.cardImageFile ? 
                                        `${this.state.card.cardImageFile.base64}` : ( this.state.card && this.state.card.cardImage ?
                                        '/img/'+this.state.card.cardImage : require("assets/images/basicCard2.png"))} style={{width: 300, height: 200}}/>
                                </div>
                            </div>
                            

                            <div className="col-md-12 col-6">
                                <Button variant="contained" color="default" className={classes.button} 
                                        onClick={this.handleOnClickFileUpload}>
                                    카드사진  
                                    <CloudUploadIcon className={classes.rightIcon} />
                                </Button>
                            </div>      


                            <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
                                <FormControl className="mb-3" fullWidth margin='normal'>
                                <InputLabel shrink={true} htmlFor="cardNo">카드번호</InputLabel>
                                    <Input
                                        id="cardNo"
                                        value={this.state.card && this.state.card.cardNo}
                                        inputComponent={TextMaskCustom}
                                        className="w-100 mb-3"
                                        inputProps={{
                                        'aria-label': 'Description',
                                        }}
                                        onChange={this.handleChange('cardNo')}
                                        placeholder="카드번호 입력"
                                    />
                                </FormControl>
                            </div>

                            <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
                                <TextField
                                    id="cardName"
                                    label="카드명"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    placeholder="카드명"
                                    value={this.state.card && this.state.card.cardName}
                                    fullWidth
                                    margin="normal"
                                    onChange={this.handleChange('cardName')}
                                />
                            </div>

                            <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}> 
                                <TextField
                                    id="cardCompanyCodeNo"
                                    select
                                    label="카드사 구분"
                                    value={this.state.card && this.state.card.cardCompanyCodeNo}
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

                            <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
                                <TextField
                                    id="cardCategoryCodeNo"
                                    select
                                    label="카드종류 구분"
                                    value={this.state.card && this.state.card.cardCategoryCodeNo}
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

                            <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
                                {/* 카드관리자와 관리자 번호는 직접 건들지 않아서 onChange를 안줘도 됨*/}
                                <TextField
                                    margin="normal"
                                    id="cardManager"
                                    label="카드관리자 사원번호"
                                    helperText="항목을 클릭하여 관리자를 선택해주세요"
                                    //사원번호 클릭시 자식컴포넌트 Open값을 true로 변경
                                    onClick={this.handleFindEmployeeOpen}
                                    value={this.state.card && this.state.card.cardManager}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
                                <TextField
                                    margin="normal"
                                    id="cardManagerName"
                                    label="카드관리자"
                                    helperText="항목을 클릭하여 관리자를 선택해주세요"
                                    onClick={this.handleFindEmployeeOpen}
                                    value={this.state.card && this.state.card.cardManagerName}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6 col-6" style={{float:"left", display:"inline"}}>
                                {/* 카드관리자와 관리자 번호는 직접 건들지 않아서 onChange를 안줘도 됨*/}
                                <TextField
                                    margin="normal"
                                    id="accountNo"
                                    label="계좌번호"
                                    helperText="항목을 클릭하여 계좌를 선택해주세요"
                                    onClick={this.handleFindAccountOpen}
                                    value={this.state.card && this.state.card.accountNo}
                                    fullWidth
                                />
                            </div>

                            <div style={{display:"none"}} >
                                카드 사진
                                <FileBase64 
                                    multiple={false}
                                    onDone = {this.handleProfileImgUpload}
                                    inputId="profileInputFile"
                                    />
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
                        
                    </DialogContentText>

                    <DialogContentText align="right">
                    <div style={{paddingTop:"20px"}}>
                        <Button 
                            variant="contained" 
                            className="jr-btn bg-deep-orange text-white"
                            onClick={(event) => {submitCard(event)}}
                        >
                            수정
                        </Button>
                        <Button 
                            variant="contained" 
                            className="jr-btn bg-deep-orange text-white"
                            onClick={ event => this.closeUpdateCard(event)} 
                        >
                            닫기
                        </Button>
                    </div>
                    </DialogContentText>
                </DialogContent>

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
    )//end of return
  }//end of render
}

const mapStateToProps = ({ accounting, code, humanResource }) => {
    const { cardInfo } = accounting;
    const { cardList, cardCategoryList } = code;
    const { checkedEmployeeData } = humanResource;
    
    return { cardInfo, cardList, cardCategoryList, checkedEmployeeData };
    // cardList와 cardCategoryList를 return 해주지 않으면 하위에 있는 TextField에서 아래와 같은 오류 발생
    // Warning: Material-UI: `children` must be passed when using the `TextField` component with `select`.
  }

export default connect(mapStateToProps, {checkedEmployee, getCodeList, cleanStoreState, updateCard})(UpdateCard);