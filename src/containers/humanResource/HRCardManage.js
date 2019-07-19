import React from "react";
import GetHRCardList from 'components/humanResource/GetHRCardList';
import CardBox from "components/CardBox";
import { connect } from 'react-redux';
import { getHRCardList } from "actions/HumanResource";


class HRCardManage extends React.Component{

  constructor(props){
    super(props);
    this.state={search:{searchKeyword:null}}
  }

    render(){

      const { HRCardList } = this.props;

      // HRCardList가 없으면 getHRCardList 액션 실행(화면크기 변경시 store 값을 잃기 때문에 써야함)
      if(HRCardList === undefined){
        this.props.getHRCardList(this.state.search);
      }

        return(
          <div>
          <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
            {/* 전해줄 props값이 있으면 전해주고 아니면 Component 자체를 부르지 않음
                내부에 있는 map이 값이 undefined면 에러가 나는 상황을 방지 */}
            {HRCardList !== undefined ? (<GetHRCardList HRCardList={HRCardList}></GetHRCardList>):"error"}
                {/* <GetHRCardList></GetHRCardList> */}
          </CardBox>
            </div>
        );
    }
}
  
  const mapStateToProps = ({humanResource}) => {
    const { HRCardList } = humanResource;
    return { HRCardList };
  }

  export default connect(mapStateToProps, { getHRCardList })(HRCardManage);
  

 