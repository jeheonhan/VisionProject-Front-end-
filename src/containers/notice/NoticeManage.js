import React from 'react';
import GetNoticeList from 'components/notice/GetNoticeList';
import { connect } from 'react-redux';
import { getNoticeList } from 'actions/Notice';
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

        const { noticeList } = this.props;

        if(noticeList === undefined){
            this.props.getNoticeList(this.state.search);
        }

        return(
            <div>
                <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                      {noticeList !==undefined ? ( <GetNoticeList noticeList={noticeList}></GetNoticeList>) : ""}
                </CardBox>
            </div>  
        );
    }

}

const mapStateToProps = ({ notice }) => {
    const { noticeList } = notice;
    return { noticeList };
}

export default connect(mapStateToProps, { getNoticeList })(NoticeManage);