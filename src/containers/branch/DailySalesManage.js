import React from 'react';
import GetDailySalesList from 'components/branch/GetDailySalesList';
import CardBox from "components/CardBox";
import { getDailySalesList } from 'actions/Branch';
import { connect } from 'react-redux';


class DailySalesManage extends React.Component{

    constructor(props){
        super(props);
        this.state = {branchNo:'b1003'} 
        // ################# 로그인시 세션에서 지점번호 가져와야함. ###########################
    }

    render() {

        const { dailySalesList } = this.props;

        if( dailySalesList === undefined ) {
            this.props.getDailySalesList(this.state.branchNo)
        }else{
            console.log("일 매출 목록조회 실패")
        }

        return(

            <div>
            <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
            {/* 전해줄 props값이 있으면 전해주고 아니면 Component 자체를 부르지 않음
                내부에 있는 map이 값이 undefined면 에러가 나는 상황을 방지 */}
            {dailySalesList !== undefined ? ( <GetDailySalesList dailySalesList={dailySalesList}></GetDailySalesList>):""}
          </CardBox>
           
            </div>
        )
    }
}

const mapStateToProps = ({ branch }) => {
    const { dailySalesList } = branch;
    return { dailySalesList };
}

export default connect(mapStateToProps, { getDailySalesList })(DailySalesManage);