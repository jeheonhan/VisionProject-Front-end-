import React from "react";
import { connect } from 'react-redux';
import { getVendorList } from "actions/Accounting";
import CardBox from "components/CardBox";
import GetVendorList from 'components/accounting/GetVendorList';

//거래처 관리의 가장 외곽. 이 안에서 목록조회가 이뤄질것
//똑똑한 컴포넌트 사용하니 container로 만든 것
class VendorManage extends React.Component{

    //왜 searchKeyword만 세팅?
    constructor(props){
        super(props);
        this.state={search:{searchKeyword:""}}
      }

      render() {
        
        //렌더링시 사용할 props의 값들을 식별자로 정의함
        const { VendorList } = this.props;
        
        //액션실행, store에 VendorList가 없으면 액션 - 사가 실행시킨다.
        if(VendorList === undefined){
            //state는 class 안에서만 사용
            //this.props가 모든 것을 다 가지고 있다.
            this.props.getVendorList(this.state.search);
        }
        
        return (
            <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                {/* 삼항연산자 사용. VendorList에 값이 있으면 불러오고 없으면 error를 발생시킴.
                하위 컴포넌트에 있는 map이 null을 참조하는 것을 방지한다.*/}
                {VendorList !== undefined ? (<GetVendorList VendorList={VendorList}></GetVendorList>):"error"}
            </CardBox>
        )
      }
}

    //accounting 자리에는 원래 state가 들어가는 자리, 접근하는 reducer의 이름으로도 셋팅가능하다.
    const mapStateToProps = ({accounting}) => {
        const { VendorList } = accounting;
        return { VendorList };
    }

//container에서 하위 component들에게 전해줄 store의 값들과 액션들을 전달해줌
export default connect(mapStateToProps, { getVendorList })(VendorManage);