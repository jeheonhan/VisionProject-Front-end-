import React from "react";
import {Redirect} from 'react-router-dom';
import GetGroupCodeList from "components/code/GetGroupCodeList"
import CardBox from "components/CardBox";
import { connect } from 'react-redux';
import { getGroupCodeList, getCodeList, getForCodeDetail } from "actions/Code";
import Button from '@material-ui/core/Button';
import Slider from "react-slick";


class CodeManage extends React.Component{

    constructor(props){
        super(props);
        this.state={
          redirect : false,
          search : {searchKeyword:""}
        }
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    handleClick = (_searchKeyword) => {
      this.setState({
        redirect:true,
        search : {searchCondition : "0", searchKeyword : _searchKeyword}
      })
      
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        this.setState({
          ...this.state,
          redirect:false
        })

        return <Redirect to={{
          pathname: "/app/code/detail",
          state: {search : this.state.search }
        }}/>
      }
    }

    next() {
      this.slider.slickNext();
    }
    previous() {
      this.slider.slickPrev();
    }

    options2 = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      appendDots: dots => (
        <div>
          <ul> 
          <Button variant="contained" className="jr-btn bg-white jr-btn-xs" onClick={this.previous}>
          <i class="zmdi zmdi-chevron-left zmdi-hc-5x"></i>
          </Button>
            {dots.map((item, index) => {
              return (
                <li style={{color:"#CC4F3A"}} key={index}>{item.props.children}</li>
              );
            })}
        <Button style={{marginLeft:"10px"}} variant="contained" className="jr-btn jr-btn-xs bg-white" onClick={this.next}>
        <i class="zmdi zmdi-chevron-right zmdi-hc-5x"></i>
        </Button></ul>
        </div>
      )
    };

    render(){
      const { groupCodeList } = this.props;
      if(groupCodeList === undefined){
        this.props.getGroupCodeList();
        return (
          <div>
           
          </div>
        )
      }
      
      else if(groupCodeList !== undefined){
        if(this.state.search.searchCondition!==undefined){
          this.props.getForCodeDetail(this.state.search);
        }
      return (
        <div>
          {this.renderRedirect()}
          
<Slider className="mb-4 slick-app-frame" ref={c => (this.slider = c)} {...this.options2} style={{clear:"both"}}>
        {groupCodeList.map((code, index) => {
           let eng = code.groupCode
          // if(eng.length>24){
          //   eng=eng.substr(0, 20)+"..."
          // }
        return (<div className="slick-slide-item" key={index}>
                <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside >
                    <GetGroupCodeList engCode={eng} action={this.handleClick} title={code.groupCodeName} code={code.groupCode} list={code.codeList}></GetGroupCodeList>
                </CardBox>
                </div>
              )
        }
        )}
      </Slider>
          </div>
        )
      }
    }

}
  
  const mapStateToProps = ({code}) => {
    const { groupCodeList, codeList } = code;
    return { groupCodeList, codeList };
  }

  export default connect(mapStateToProps, { getGroupCodeList, getCodeList, getForCodeDetail })(CodeManage);
  

 