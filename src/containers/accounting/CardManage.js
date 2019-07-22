import React from "react";
import { connect } from 'react-redux';
import { getCardList } from "actions/index";
import CardBox from "components/CardBox";
import GetCardList from 'components/accounting/GetCardList';

class CardManage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search : 
                { 
                    searchKeyword : "",
                    usageCondition : "01"
                }
        }
    }

    render() {
        
        const { cardList } = this.props;
        
        if(cardList === undefined) {
            this.props.getCardList(this.state.search);
        }
        
        return (
            <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                {/* 그룹코드의 카드사명이cardList이기에 카드 목록조회 결과의 변수를 _cardList로 둔다. */}
                {cardList !== undefined ?(<GetCardList _cardList={cardList}></GetCardList>) : "error" }
            </CardBox>
        )
    }
}//end of class

    const mapStateToProps = ({accounting}) => {
        const { cardList } = accounting;
        return { cardList };
    }

export default connect( mapStateToProps, { getCardList })(CardManage);