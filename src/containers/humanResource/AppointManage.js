import React from 'react';
import CardBox from 'components/CardBox';
import { connect } from 'react-redux';
import { getAppointList, getSimpleHRCardByEmployeeNo } from 'actions/HumanResource';
import GetAppointList from 'components/humanResource/GetAppointList';
import SimpleHRCard from 'components/humanResource/SimpleHRCard';
import ModifyAppoint from 'components/humanResource/ModifyAppoint';

class AppointManage extends React.Component{
    constructor(props){
        super(props);
        this.state={search:{searchKeyword:null},
                    simpleCardOpen:false,
                    modifyAppointOpen:false,
                }
    }

    render(){
        const { appointList } = this.props;

        console.log("asdfj :: "+this.state)

        if(appointList === undefined){
            this.props.getAppointList(this.state.search)
        }

        //사원 프로필 화면 열기
        const handleSimpleHRCardOpen = () => {
            this.setState({simpleCardOpen:true})
        }

        //사원 프로필 화면 열기
        const handleSimpleHRCardClose = () => {
            this.setState({simpleCardOpen:false})
        }
        
        //인사발령 수정 화면 열기
        const handleModifyAppointOpen = () => {
            this.setState({modifyAppointOpen:true})
        }

        //인사발령 수정 화면 닫기
        const handleModifyAppointClose = () => {
            this.setState({modifyAppointOpen:false})
        }

        return(
            
            <div >
            <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside  >
                {appointList !== undefined ? 
                    (<GetAppointList  
                        getSimpleHRCardByEmployeeNo={this.props.getSimpleHRCardByEmployeeNo}
                        handleSimpleHRCardOpen={handleSimpleHRCardOpen}
                        handleModifyAppointOpen={handleModifyAppointOpen}
                        handleModifyAppointClose={handleModifyAppointClose}
                        />):""}
          </CardBox>
            <SimpleHRCard open={this.state.simpleCardOpen} handleSimpleHRCardClose={handleSimpleHRCardClose}/>

            {this.state.modifyAppointOpen &&  <ModifyAppoint open={this.state.modifyAppointOpen}
                            handleModifyAppointClose={handleModifyAppointClose}/>}
            </div>
            
        );
    }
}

const mapStateToProps = ({ humanResource }) => {
    const { appointList } = humanResource;
    return { appointList }
}

export default connect(mapStateToProps, { getAppointList,  getSimpleHRCardByEmployeeNo})(AppointManage)