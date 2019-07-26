import React from "react";
import { connect } from 'react-redux';
import { getSalaryList } from "actions/index";
import CardBox from "components/CardBox";
import GetSalaryList from 'components/accounting/GetSalaryList';

class SalaryManage extends React.Component{

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
        
        const { salaryList } = this.props;
        
        if(salaryList === undefined) {
            this.props.getSalaryList(this.state.search);
        }
        
        return (
            <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                {salaryList !== undefined ?(<GetSalaryList salaryList={salaryList}></GetSalaryList>) : "error" }
            </CardBox>
        )
    }
}//end of class

    const mapStateToProps = ({accounting}) => {
        const { salaryList } = accounting;
        return { salaryList };
    }

export default connect( mapStateToProps, { getSalaryList })(SalaryManage);