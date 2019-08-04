import React from 'react';
import GetNoticeList from 'components/notice/GetNoticeList';
import AddNotice from 'components/notice/AddNotice';
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

        const { noticeList, forUpdateNoticeHeaderList } = this.props;

        if(noticeList === undefined){
            this.props.getNoticeList(this.state.search);
        }

        if(forUpdateNoticeHeaderList === undefined){
            this.props.getUpdateNoticeHeaderList();
        }

        return(
            <div>
                    <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                        {noticeList !==undefined ? ( <GetNoticeList noticeList={noticeList} noticeHeaderList={forUpdateNoticeHeaderList}></GetNoticeList>) : ""}
                    </CardBox>
            </div>  
        );
    }

}

const mapStateToProps = ({ notice }) => {
    const { noticeList, forUpdateNoticeHeaderList } = notice;
    return { noticeList, forUpdateNoticeHeaderList };
}

export default connect(mapStateToProps, { getNoticeList, getUpdateNoticeHeaderList })(NoticeManage);