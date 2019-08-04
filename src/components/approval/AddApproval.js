import React from 'react';
import TextField from '@material-ui/core/TextField';
import ApprovalFormCKEditor from 'components/approvalForm/ApprovalFormCKEditor';
import Approver from './approver';
import FindEmployeeForApprovalLine from './FindEmployeeForApprovalLine';
import Button from '@material-ui/core/Button';
import {CallMade} from '@material-ui/icons';
import {connect} from 'react-redux';
import {addApproval, getApprovalList} from 'actions/index';
import {Redirect} from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert'
import moment from 'moment';

class AddApproval extends React.Component{
    constructor(props){
        super(props);
        this.state={
            approvalTitle:JSON.parse(localStorage.getItem("user")).employeeName+"_"+this.props.formName
            ,approvalContent:this.props.form
            ,firstApprover:{
                        approverNumbering:null
                    ,approvalNo:null
                    ,employeeName:JSON.parse(localStorage.getItem("user")).employeeName
                    ,employeeNo:JSON.parse(localStorage.getItem("user")).employeeNo
                    ,signatureImage:JSON.parse(localStorage.getItem("user")).signatureImage
                    ,rankCodeName:"담당"
                    ,ordinal:0
                    ,approvalStatus:1
                }
            ,secondApprover:{
                    approverNumbering:null
                        ,approvalNo:null
                        ,employeeNo:null
                        ,signatureImage:"https://papermilkdesign.com/images/line-clipart-transparent-5.png"
                        ,rankCodeName:""
                        ,ordinal:1
                        ,approvalStatus:0
                        }
            ,thirdApprover:{
                        approverNumbering:null
                           ,approvalNo:null
                           ,employeeNo:null
                           ,signatureImage:"https://papermilkdesign.com/images/line-clipart-transparent-5.png"
                           ,rankCodeName:""
                           ,ordinal:2
                           ,approvalStatus:0
                      }
            ,fourthApprover:{
                            approverNumbering:null
                            ,approvalNo:null
                            ,employeeNo:null
                            ,signatureImage:"https://papermilkdesign.com/images/line-clipart-transparent-5.png"
                            ,rankCodeName:""
                            ,ordinal:3
                            ,approvalStatus:0
                        }
            ,fifthApprover:{
                            approverNumbering:null
                            ,approvalNo:null
                            ,employeeNo:null
                            ,signatureImage:"https://papermilkdesign.com/images/line-clipart-transparent-5.png"
                            ,rankCodeName:""
                            ,ordinal:4
                            ,approvalStatus:0
                        }
            ,approvalFormNo:this.props.formNo
            ,totalApproverCount:""
            ,open:false
            ,redirect:false
            ,warning:false
            ,success:false
        }
    }

    //사원검색 component open
    handleOpen = () => {
        this.setState({
            ...this.state,
            open:true
        })
    }

    //사원검색 컴포넌트 close
    handleClose = () =>{
        this.setState({
            ...this.state,
            open:false
        })
    }

    //상신 버튼 click했을 때
    handleSend = (event) =>{
        event.preventDefault();
        if(this.state.secondApprover.employeeNo===null){
            this.setState({
                warning:true,
                warningText:"결재라인을 등록해주세요"
            })
            return;
        }else{
            this.props.addApproval(this.state);
            this.setState({
                success:true,
            })
        }
    }

    //상신 alert 확인 눌렀을 때 
    onConfirm = () => {
        this.setState({
            success:false,
            redirect:true,
        })
    }

    //결재함으로 이동시키는 메서드
    renderRedirect = () => {
        if (this.state.redirect) {
          this.props.getApprovalList({searchCondition:"2", searchKeyword:this.state.firstApprover.employeeNo});
          this.setState({
            ...this.state,
            redirect:false
          })
    
          return <Redirect to={{
            pathname: "/app/approval/approvalBox",
          }}/>
        }
      }

    //결재서제목 handler
    handleTitle = (event) => {
        this.setState({
          ...this.state,
          approvalTitle : event.target.value
        })
    }

    //결재서내용 handler
    handleForm = (event) => {
        this.setState({
            ...this.state,
            approvalContent : event.editor.getData()
        })
    }

    //경고 alert 확인버튼 눌렀을 때
    warningOk = () => {
        this.setState({
            warning:false
        })
    }

    //사원검색 컴포넌트 확인 눌렀을 떄 
    handleClickOk = (data) => {
        //작성자가 결재라인에 포함되는지 확인
        for(const aprvr in data){
            if(data[aprvr].employeeNo===this.state.firstApprover.employeeNo){
                this.setState({
                    warning:true,
                    warningText:<div dangerouslySetInnerHTML={ {__html: "작성자는 '담당'으로 결재라인에 포함되며, <br> 추가할 수 없습니다."} }/>
                })
                return;
            }
        }
        const size = data.length;
        //결재라인에 네명 이상 등록되었는지 확인
        if(size>=5){
            this.setState({
                warning:true,
                warningText:<div dangerouslySetInnerHTML={ {__html: "결재라인은 작성자를 제외하고,<br> 최대 네 명까지 가능합니다."} }/>
            })
            return;
        }
        //결재자 등록하기
        let defaultValue = {approverNumbering:null
                ,approvalNo:null
                ,employeeName:null
                ,employeeNo:null
                ,signatureImage:null
                ,rankCodeName:null
                ,ordinal:null
                ,approvalStatus:null
                }
        let second = defaultValue;
        let third = defaultValue;
        let fourth = defaultValue;
        let fifth = defaultValue;
        if(size==4){
            fifth = data[3]
        }
        if(size>=3){
            fourth = data[2]
        }
        if(size>=2){
            third = data[1]
        }
        if(size>=1){
            second = data[0]
        }
        this.setState({
            secondApprover:{
                    ...this.state.secondApprover
                    ,employeeName:second.employeeName
                    ,employeeNo:second.employeeNo
                    ,signatureImage:second.signatureImage
                    ,rankCodeName:second.rankCodeName
                    },
            thirdApprover:{
                ...this.state.thirdApprover
                ,employeeName:third.employeeName
                ,employeeNo:third.employeeNo
                ,signatureImage:third.signatureImage
                ,rankCodeName:third.rankCodeName
                },
            fourthApprover:{
                ...this.state.fourthApprover
                ,employeeName:fourth.employeeName
                ,employeeNo:fourth.employeeNo
                ,signatureImage:fourth.signatureImage
                ,rankCodeName:fourth.rankCodeName
                },
            fifthApprover:{
                ...this.state.fifthApprover
                ,employeeName:fifth.employeeName
                ,employeeNo:fifth.employeeNo
                ,signatureImage:fifth.signatureImage
                ,rankCodeName:fifth.rankCodeName
                },
            open:false,
            totalApproverCount:(size+1)
        })
    }


    render(){
        console.log(this.state);
        return(
            <div className="jr-card" style={{paddingBottom:"60px"}}>
                {this.renderRedirect()}


                <div style={{display:"inline", marginLeft:"0px"}}>
                <span style={{float:"right", marginTop:"1%", marginLeft:"0px"}}>
                <FindEmployeeForApprovalLine 
                    style={{display:"inline"}}
                    open={this.state.open} 
                    handleOpen={this.handleOpen} 
                    handleClose={this.handleClose}
                    handleOk={this.handleClickOk}/>
                <Approver arr={[this.state.firstApprover, this.state.secondApprover, this.state.thirdApprover, this.state.fourthApprover, this.state.fifthApprover]}/>
                </span>
                </div>

                
                <div className="col-md-4" style={{marginRight:'0px', padding:"0px"}}>
                <TextField
                    error
                    fullWidth
                    id="outlined-required"
                    label="결재서제목"
                    value={this.state.approvalTitle}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleTitle}
                />
                </div>

                <div className="col-md-4 manage-margin" style={{marginRight:'0px'}}>
                <TextField 
                    style={{width:"30%"}}
                    margin="normal"
                    id="registrantEmployeeName"
                    label="등록자"
                    value={JSON.parse(localStorage.getItem("user")).employeeName}
                />
                <TextField 
                    margin="normal"
                    id="registrantEmployeeName"
                    label="작성일자"
                    value={moment().format("YYYY/MM/DD")}
                />
                </div>
                


                <div style={{display:"block", marginTop:"2%"}}>
            <ApprovalFormCKEditor 
                handleForm={this.handleForm} 
                content={this.state.approvalContent}
                >
            </ApprovalFormCKEditor>
            </div>
            
            <Button style={{float:"right"}} variant="contained" color="primary" className="jr-btn jr-btn-lg" onClick={this.handleSend}>
                <CallMade/>상신
            </Button>

            {/* 경고alert */}
            <SweetAlert show={this.state.warning}
                    warning
                    confirmBtnText="확인"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title=""
                    onConfirm={this.warningOk}
            >
                {this.state.warningText}
            </SweetAlert>

            {/* 상신alert */}
            <SweetAlert show={this.state.success} success title=""
                    onConfirm={this.onConfirm}>
                        작성하신 결재서류가 상신되었습니다. <br/>결재함으로 이동합니다.
            </SweetAlert>
            </div>
        );
    }
}

export default connect(null, {addApproval, getApprovalList})(AddApproval);