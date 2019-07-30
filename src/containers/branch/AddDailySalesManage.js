import React from 'react';
import AddDailySales from 'components/branch/AddDailySales';
import { getSalesMenuList } from 'actions/Branch';
import { connect } from 'react-redux';


class AddDailySalesManage extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        const { salesMenuList } = this.props;

        if( salesMenuList === undefined ){
            this.props.getSalesMenuList();
        }

        return(
            
                <AddDailySales salesMenuList={ salesMenuList && salesMenuList}></AddDailySales>
            
        )
    }

}

const mapStateToProps = ({ branch }) => {
    const { salesMenuList } = branch;
    return { salesMenuList };
}

export default connect(mapStateToProps, { getSalesMenuList })(AddDailySalesManage);