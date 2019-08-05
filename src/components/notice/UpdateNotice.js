import React from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import NoticeCKEditor from 'components/notice/NoticeCKEditor';
import CardBox from 'components/CardBox';
import SweetAlert from 'react-bootstrap-sweetalert';
import Snackbar from '@material-ui/core/Snackbar';


function Transition(props) {
    return <Slide direction="down" {...props} />;
  }

class UpdateNotice extends React.Component {

    state = {
        success : false,
        updateFlag : false,
        warning:false,
        snackBar:false,
        snackBarContents:'',
    }

    
    
    handleChange = (e) => {

        e.preventDefault();
        var _noticeHeaderCodeName;

   //selectBar는 한개의 값을 전달해 줄 수 있는데 selectBar로 두가지의 값을 setState하려 할 경우 한개의 값을 먼저 받고
   //handleChange부분에서 if문과 map()로 나머지 값을 setState 해준다. 
       if(e.target.name == 'noticeHeaderCodeNo'){
           if(this.props.noticeHeaderList !== null){
               this.props.noticeHeaderList.map(element => {
                   if(element.noticeHeaderCodeNo == e.target.value){
                       _noticeHeaderCodeName = element.noticeHeaderCodeName;
                   }
               })
           }
           this.setState({
           ...this.state,
           notice : {
               ...this.state.notice,
           noticeHeaderCodeNo:e.target.value,
           noticeHeaderCodeName:_noticeHeaderCodeName
           }
           });
       }
       else{
           //alert("아님")
       this.setState({
         ...this.state,
         notice : {
           ...this.state.notice,
           [e.target.name] : e.target.value,
                }
            });
        }
    };

    handleForm = (event) => {
        this.setState({
            ...this.state,
            notice : {
                ...this.state.notice,
                content : event.editor.getData()
            }
        })
        
    }

    updateNotice = () => {
        this.setState({ updateFlag : false});
        this.props.updateNotice(this.state.notice);
    }

    onSweetAlert = (event) => {
        event.preventDefault();
        if(this.state.notice.noticeTitle == ''){
            this.openSnackBar('공지사항 제목')
        }else if(this.state.notice.noticeHeaderCodeNo == '') {
            this.openSnackBar('공지대상')
        }else{
        this.setState({
            warning:true,
        })
        }
    }

    warningOk = () => {
        this.setState({
            warning:false,
        })
        this.updateNotice();
    }

    onCancel = () => {
      this.setState({
          warning:false,
      })
      this.props.updateClose();
    }

    openSnackBar  = (valueName) => {
    this.setState({ ...this.state, snackBar: true, snackBarContents : valueName });
    };
    
    closeSnackBar = () => {
    this.setState({ ...this.state, snackBar: false });
    };

    successOn = () => {
        this.setState({
            success:true,
        })
    }

    successOk = () => {
        this.setState({
            success:false,
        })
    }

    


    render() {

        console.log(this.state.notice);

        const { noticeDetail, noticeHeaderList } = this.props;
        const { notice } = this.state;

        if( !this.state.updateFlag ) {
            if( noticeDetail !== null && this.state.notice !== noticeDetail ) {
                this.setState({
                    updateFlag : true,
                    notice : noticeDetail
                })
            }
        }

        return(

            <div>
                <Dialog
                     open={this.props.updateOpen}
                     onClose={this.props.updateClose}
                     TransitionComponent={Transition}
                     maxWidth=""
                    >

                <AppBar className="position-relative">
                    <Toolbar className="bg-secondary">
                    <Typography variant="title" color="inherit" style={{
                        flex: 1,
                        minWidth: '800px',
                    }}>
                        공지사항 수정
                    </Typography>
                    <Button onClick={this.props.updateClose} color="inherit">
                        닫기
                    </Button>
                    </Toolbar>
                </AppBar>

                <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                    <div>

                <div class="row">
                <div className="col-md-1"/>
                <div className="col-md-2 col-1" >
                    <TextField
                    name="employeeName"
                    label="작성자"
                    value={notice && notice.employeeName}
                    margin="normal"
                    fullWidth
                    />
                </div>
                </div>

                <div class="row">

                <div className="col-md-1"/>

                <div className="col-md-3 col-3" style={{display:"inline"}}>
                    <TextField
                        name="noticeHeaderCodeNo"
                        select
                        label="공지대상 선택"
                        value={notice && notice.noticeHeaderCodeNo}
                        onChange={this.handleChange}
                        helperText="공지할 대상을 선택하세요"
                        margin="normal"
                        fullWidth
                    >
                      {noticeHeaderList && noticeHeaderList.map( option => (
                          <MenuItem value={option.noticeHeaderCodeNo}>
                          {option.noticeHeaderCodeName}
                          </MenuItem>
                      ))}

                    </TextField>
                </div>

                <div className="col-md-6 col-6" >
                    <TextField
                    name="noticeTitle"
                    label="공지사항 제목"
                    value={notice && notice.noticeTitle}
                    onChange={this.handleChange}
                    helperText="*필수입력란"
                    margin="normal"
                    fullWidth
                    />                
                    <br/>
                </div>
                </div>
                <br/>
                <NoticeCKEditor 
                handleForm={this.handleForm} 
                content={notice && notice.content}
                >
                </NoticeCKEditor>
                </div>

                </CardBox>

                <div align="center">
                    <Button className="btn-block text-white  bg-deep-orange col-md-4 col-4" 
                            color="default" size="medium" 
                            onClick={this.onSweetAlert}
                            
                            >
                                수정하기
                    </Button>

                    <br/><br/><br/>
                </div>

                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    open={this.state.snackBar}
                    onClose={this.closeSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackBarContents} 항목을 입력하지 않으셨습니다</span>}
                    autoHideDuration={1500}
                    />

                </Dialog>

                <SweetAlert show={this.state.warning}
                        warning
                        showCancel
                        cancelBtnText="네"
                        confirmBtnText="아니오"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="default"
                        title="공지사항을 수정합니다."
                        onConfirm={this.onCancel}
                        onCancel={this.warningOk}
                >
                    공지사항을 수정하시겠습니까?
                </SweetAlert>

                <SweetAlert show={this.state.success} success title="수정되었습니다!" onConfirm={this.successOk}>
                </SweetAlert>

            </div>

        );
    }

}

export default UpdateNotice