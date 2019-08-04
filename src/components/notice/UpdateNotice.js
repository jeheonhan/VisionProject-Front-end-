import React from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ApprovalFormCKEditor from 'components/approvalForm/ApprovalFormCKEditor';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SweetAlert from 'react-bootstrap-sweetalert'


function Transition(props) {
    return <Slide direction="down" {...props} />;
  }

class UpdateNotice extends React.Component {

    state = {
        success : false,
        updateFlag : false,
        warning:false,
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
        this.setState({
            warning:true,
        })
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
                        minWidth: '1000px',
                    }}>
                        공지사항 수정
                    </Typography>
                    <Button onClick={this.props.updateClose} color="inherit">
                        닫기
                    </Button>
                    </Toolbar>
                </AppBar>

                <div className="col-md-4 col-4" >
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

                <div className="col-md-4 col-4" >
                    <TextField
                    name="employeeName"
                    label="작성자"
                    value={notice && notice.employeeName}
                    //onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                    />
                </div>
                <div className="col-md-4 col-4" style={{display:"inline"}}>
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
                    {/* <br/><br/><br/> */}
                </div>

                <ApprovalFormCKEditor 
                handleForm={this.handleForm} 
                content={notice && notice.content}
                >
                </ApprovalFormCKEditor>

                <div align="center">
                    <Button className="btn-block text-white  bg-deep-orange col-md-4 col-4" 
                            color="default" size="medium" 
                            onClick={this.onSweetAlert}
                            
                            >
                                수정하기
                    </Button>

                    <br/><br/><br/>
                </div>

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