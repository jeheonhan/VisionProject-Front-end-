import React from "react";
import { connect } from 'react-redux';
import { getAccountList } from "actions/index";
import CardBox from "components/CardBox";
import GetAccountList from 'components/accounting/GetAccountList';

class AccountManage extends React.Component{

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
        
        const { accountList } = this.props;
        
        if(accountList === undefined) {
            this.props.getAccountList(this.state.search);
        }
        
        return (
            <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                {accountList !== undefined ?(<GetAccountList accountList={accountList}></GetAccountList>) : "error" }
            </CardBox>
        )
    }
}//end of class

    const mapStateToProps = ({accounting}) => {
        const { accountList } = accounting;
        return { accountList };
    }

export default connect( mapStateToProps, { getAccountList })(AccountManage);