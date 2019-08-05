import React from 'react';
import { connect } from 'react-redux';
import { getCommuteList, 
         addGoToWork,
         addLeaveWork } from 'actions/index';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert'
import Snackbar from '@material-ui/core/Snackbar';


const localizer = BigCalendar.momentLocalizer(moment);


class ManageCommute extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user:JSON.parse(localStorage.getItem('user')),
            goToWorkConfirm:false,
            leaveWorkConfirm:false,
            snackbar:false,
            snackbarContents:""
        }
    }
    
    eventStyleGetter = (event, start, end, isSelected) => {
        console.log(event);
        var backgroundColor = event.hexColor;
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }


    componentWillMount(){
        this.props.getCommuteList(this.state.user.employeeNo);
    }

    //출근여부 Confirm 열기
    handleGoToWorkConfirmOpen = () => {
        this.setState({
            goToWorkConfirm:true
        })
    }

    //퇴근 Confirm 열기
    handleLeaveWorkConfirmOpen = (_data) => {
        this.setState({
            leaveWorkConfirm:true,
            data:_data
        })
    }

    //출근 Confirm 확인
    onConfirmGoToWork = () => {
        this.props.addGoToWork({employeeNo:this.state.user.employeeNo});
        this.setState({
            goToWorkConfirm:false
        })
    }

    //퇴근 Confirm 확인
    onConfirmLeaveWork = () => {
        console.log(this.state.data)
        this.props.addLeaveWork(this.state.data);
        this.setState({
            leaveWorkConfirm:false
        })
    }

    //출근 Confirm 취소
    onCancelGoToWork = () => {
        this.setState({
            goToWorkConfirm:false
        })
    }

    //퇴근 Confirm 취소
    onCancelLeaveWork = () => {
        this.setState({
            leaveWorkConfirm:false
        })
    }

    //스낵바 열기
    handleRequestSnackBarOpen = (contents) => {
        this.setState({
        snackbar:true,
        snackbarContents:contents
        })
    }


    //스낵바 닫기
    handleRequestSnackBarClose = () => {
        this.setState({
        snackbar:false,
        snackbarContents:""
        })
    }

    render(){

        const { commuteList } = this.props;

        var events = [];

        if(commuteList){
            commuteList.map(elements => {
                events = events.concat(
                {'title': '출근 : '+(elements.goToWorkTime).substring(10),
                'allDay': true,
                'start': new Date(elements.goToWorkTime),
                'end': new Date(elements.goToWorkTime)}
                )
                
                if(elements.leaveWorkTime){
                    events = events.concat(
                        {'title': '퇴근 : '+(elements.leaveWorkTime).substring(10),
                        'allDay': true,
                        'start': new Date(elements.leaveWorkTime),
                        'end': new Date(elements.leaveWorkTime)}
                    )
                }
            })
        }

        const  handleAddCommute = (slotInfo) => {
            var d = moment();
        
            if(new moment(Date.parse(slotInfo.start)).format("YYYY-MM-DD") == d.format('YYYY-MM-DD')){
                var count = 0;

                commuteList.map( v => {
                    if(v.commuteDate == d.format('YYYY/MM/DD')){
                            if(v.leaveWorkTime){
                                this.handleRequestSnackBarOpen("이미 퇴근처리가 완료되었습니다.");
                            }else{
                                this.handleLeaveWorkConfirmOpen(v);
                            }
                    }else{
                        count++;
                    }
                })
                if(count == commuteList.length){
                    this.handleGoToWorkConfirmOpen();
                }
            }
        }


        return(
            <div className="app-calendar app-cul-calendar animated slideInUpTiny animation-duration-3">
                <h3 className="callout">
                </h3>
                <BigCalendar
                    selectable
                    events={events}
                    localizer={localizer}
                    defaultView='month'
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    //eventStyleGetter={(this.eventStyleGetter)}
                    onSelectEvent={event => alert(event.title)}
                    onSelectSlot={(slotInfo) => {handleAddCommute(slotInfo)}}
                    ViewProps={{month:false}}
                />
                <SweetAlert show={this.state.goToWorkConfirm}
                    warning
                    showCancel
                    confirmBtnText={"Yes"}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={<div dangerouslySetInnerHTML={ {__html: "현재시간 "+moment().format("YYYY/MM/DD HH:mm:ss")+"으로<br/> 출근을 입력하시겠습니까?"} }/>}
                    onConfirm={this.onConfirmGoToWork}
                    onCancel={this.onCancelGoToWork}
                ></SweetAlert>
                <SweetAlert show={this.state.leaveWorkConfirm}
                    warning
                    showCancel
                    confirmBtnText={"Yes"}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={<div dangerouslySetInnerHTML={ {__html: "현재시간"+moment().format("YYYY/MM/DD HH:mm:ss")+"으로<br/> 퇴근을 입력하시겠습니까?"} }/>}
                    onConfirm={this.onConfirmLeaveWork}
                    onCancel={this.onCancelLeaveWork}
                ></SweetAlert>
                <Snackbar
                    anchorOrigin={{vertical:'top', horizontal:'center'}}
                    open={this.state.snackbar}
                    autoHideDuration="1500"
                    onClose={this.handleRequestSnackBarClose}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackbarContents}</span>}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ humanResource }) => {
    const { commuteList } = humanResource;
    return { commuteList }
}

export default connect(mapStateToProps, { getCommuteList, addGoToWork, addLeaveWork })(ManageCommute);