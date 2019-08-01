import React from "react";
import CardBox from "components/CardBox";
import GetCardList from 'components/accounting/GetCardList';
import GetCardThumbnails from 'components/accounting/GetCardThumbnails';
import { getCardList, getCard } from 'actions';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import AddCard from "components/accounting/AddCard";

import {ButtonGroup} from 'reactstrap';
import Button from '@material-ui/core/Button';

import { ViewList, Queue } from '@material-ui/icons'

class CardManage extends React.Component{
    
    constructor(props){
        super(props);

        this.state={
            search : { 
                searchKeyword : "",
                usageCondition : "01"
            },
            menuFlag:true,
        }
        
        this.addVendorRef = React.createRef(); 
    }

    //섬네일 - 리스트로 보기 토글
    changeMenu = () => {
        this.setState({
            menuFlag : !this.state.menuFlag
        })
    }

    addVendor = (event) => {
        event.preventDefault();
        console.log(this.addVendorRef)
        // this.addVendorRef.current.handleClickOpen();
    }

    componentDidMount(){
        console.log(this.addVendorRef)
        console.log(this.addVendorRef.current)
    }

    render() {

        const { cardList } = this.props;
            
        if(cardList === undefined) {
            this.props.getCardList(this.state.search);
        }

        return (
            <div>
                { !this.state.menuFlag ? 
                    <div>
                        <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                            {cardList !== undefined ? (<GetCardList cardList={cardList}
                                                                    changeMenu={this.changeMenu}
                                                        ></GetCardList>) : "Loading" }
                        </CardBox>

                        <div align="right">
                            <AddCard ref= {this.addVendorRef }></AddCard>
                        </div>

                    </div>
                :
                    <div>
                        {cardList !== undefined ? (<GetCardThumbnails 
                                                        cardList={cardList}
                                                        getCard={this.props.getCard}
                                                    >
                                                    </GetCardThumbnails>) : "Loading" }
                        <div style={{
                                position:"fixed", 
                                width:"30px", 
                                height:"50px", 
                                display:"inline-block", 
                                // 창에서 오른쪽 길이
                                right:"0%",
                                // 창에서 위에서 부터의 높이
                                top:"85%",
                                backgroundColor: "transparent", 
                                margin:0}}>
                                    <Paper className="text-white" 
                                           elevation={16}
                                                style={{
                                                    backgroundColor:"#f15b41", 
                                                    opacity:0.8, 
                                                    padding:"20px", 
                                                    float:"right"}}
                                    >
                                        <ViewList style={{cursor:'pointer'}} onClick={ this.changeMenu } fontSize="small" titleAccess="리스트로 보기"/>
                                        <Queue style={{cursor:'pointer'}} onClick={ event => this.addVendor(event) } fontSize="small" titleAccess="등록하기"/>
                                    </Paper>
                        </div>

                        <div style={{display:"none"}} >
                            <AddCard ref={this.addVendorRef}/>
                        </div>

                    </div>
                }

            </div>
        )
        //end of return
    }
}//end of class

const mapStateToProps = ({ accounting }) => {
    const { cardList } = accounting;
  
    return { cardList };
}

export default connect(mapStateToProps, { getCardList, getCard })(CardManage);