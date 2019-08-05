import React from 'react';
import AddCode from 'components/code/addCode';
import { connect } from 'react-redux';
import CardBox from 'components/CardBox';
import {getCodeList, getForCodeDetail} from 'actions/Code'
import CodeDetailListTable from 'components/code/CodeDetailListTable';

class CodeDetailManage extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          search: this.props.search
        };
      }

    render(){
        const {codeList} = this.props;

        if(codeList===undefined || codeList===''){
            this.props.getForCodeDetail(this.state.search)
            return (<div></div>)
        }

        else
        //alert(codeList);
           { return(
            <div>
                
                {codeList !== undefined ? (<CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside><CodeDetailListTable /></CardBox>) : (<div>&nbsp;&nbsp;&nbsp; 이 URL로는 직접 접근하실 수 없습니다. 코드관리를 통해 접근해주세요.</div>)}
                
                {codeList !== undefined ? (<div align="right"style={{padding:"10px"}}>
                    <AddCode List={codeList}></AddCode>
                </div>):("")}
            </div>
        )}
    }
}
const mapStateToProps = ({ code }) => {
    const { codeList } = code;
    return { codeList }
}

export default connect(mapStateToProps, { getCodeList, getForCodeDetail })(CodeDetailManage)