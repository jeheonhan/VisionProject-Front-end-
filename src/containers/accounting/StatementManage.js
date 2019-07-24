import React from "react";
import { connect } from 'react-redux';
import { getStatementList } from "actions/index";
import CardBox from "components/CardBox";
import GetStatementList from 'components/accounting/GetStatementList';

class AccountManage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search : 
                { 
                    searchKeyword : "",
                }
        }
    }

    render() {
        
        const { statementList } = this.props;
        
        if(statementList === undefined) {
            this.props.getStatementList(this.state.search);
        }
        
        return (
            <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                {statementList !== undefined ?(<GetStatementList statementList={statementList}></GetStatementList>) : "error" }
            </CardBox>
        )
    }
}//end of class

    const mapStateToProps = ({accounting}) => {
        const { statementList } = accounting;
        return { statementList };
    }

export default connect( mapStateToProps, { getStatementList })(AccountManage);