import React from 'react';
import GetCodeList from 'components/code/GetCodeList';
import { connect } from 'react-redux';
import {getCodeList} from 'actions/Code'

class CodeDetailManage extends React.Component{

    constructor(props){
        super(props);
        this.state={search:{searchKeyword: this.props.code}}
    }

    render(){
        
        const {codeList} = this.props;

        if(codeList === undefined){
            this.props.getCodeList(this.state.search)
        }

        return(
            <div>
                {codeList !== undefined ? (<GetCodeList list={codeList}></GetCodeList>):""}
            </div>
        )
    }
}
const mapStateToProps = ({ code }) => {
    const { codeList } = code;
    return { codeList }
}

export default connect(mapStateToProps, { getCodeList })(CodeDetailManage)