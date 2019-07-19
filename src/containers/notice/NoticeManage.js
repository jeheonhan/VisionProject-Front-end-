import React from 'react';
import GetNoticeList from 'components/notice/GetNoticeList';
import { connect } from 'react-redux';
import { getNoticeList } from 'actions/Notice';


class NoticeManage extends React.Component{

    constructor(props){
        super(props);
        this.state = {search:{serachKeyword:null}}
    }

    render(){

        const { noticeList } = this.props;

        if(noticeList === undefined){
            this.props.getNoticeList(this.state.search);
        }else{
            console.log("########### :: Fail :: ")
        }

        return(
            <div>
            {noticeList && ( <GetNoticeList noticeList={noticeList}></GetNoticeList>)}
            </div>  
        );
    }

}

const mapStateToProps = ({ notice }) => {
    const { noticeList } = notice;
    return { noticeList }
}

export default connect(mapStateToProps, { getNoticeList })(NoticeManage)