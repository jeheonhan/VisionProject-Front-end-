import React from 'react';
import GetNoticeList from 'components/notice/GetNoticeList';
import { connect } from 'react-redux';
import { getNoticeList, getUpdateNoticeHeaderList } from 'actions/Notice';
import CardBox from 'components/CardBox';


class NoticeManage extends React.Component{

    constructor(props){
        super(props);
        this.state = {search:{
            searchCondition:'2',
            searchKeyword:'01'
            }}
    }

    render(){

        const { noticeList, noticeHeaderList } = this.props;

        if(noticeList === undefined){
            this.props.getNoticeList(this.state.search);
        }

        if(noticeHeaderList === undefined){
            this.props.getUpdateNoticeHeaderList();
        }

        return(
            <div>
                <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                      {noticeList !==undefined ? ( <GetNoticeList noticeList={noticeList} noticeHeaderList={noticeHeaderList}></GetNoticeList>) : ""}
                </CardBox>
            </div>  
        );
    }

}

const mapStateToProps = ({ notice }) => {
    const { noticeList, noticeHeaderList } = notice;
    return { noticeList, noticeHeaderList };
}

export default connect(mapStateToProps, { getNoticeList, getUpdateNoticeHeaderList })(NoticeManage);