import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { connect } from 'react-redux';
import { getCodeList } from 'actions/index';


//props로 opne boolean 값이 true가 오면 opne이 된다.
//props로 handleSubComponentClose전달 받아서 자기 자신을 close 시켜야한다.
class FindRank extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      checked: [1],
      search:{
        searchKeyword:"rank"
      }
    };
  }

  // handleSearch = (event) => {
  //   this.setState({search:{searchKeyword:event.target.value}})
  //   this.props.getCodeList({searchKeyword:event.target.value})
  // }


  
 
    render(){

      var checkedParam = null;

      const { rankList } = this.props;
     

      const OKbuttonFunction = () => {
        this.props.checkedRank(checkedParam)
        this.props.handleSubRankComponentClose();
      }

      if(rankList === undefined){
        this.props.getCodeList(this.state.search);
        
      }else{
        //alert(codeList[0].codeName);
      }

      const eventHandler = (event, row) => {
        event.preventDefault();
        checkedParam = row;
      }

    return(        
        <Dialog open={this.props.open}  maxWidth="xl">
          <DialogTitle>직급 검색</DialogTitle>
          <DialogContent >

          <List >

          {rankList && rankList.map(row =>
            <ListItem button key={row.codeNo}>
              {/* <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={"/img/newyork.jpg"}/>
              </ListItemAvatar> */}
              <ListItemText className="br-break" primary={row.codeName}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemSecondaryAction>
                <Checkbox color="primary"
                          onClick={event => eventHandler(event, row)}
                />
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>

          </DialogContent>
          <DialogActions>
            <Button onClick={OKbuttonFunction} color="secondary">
                확인
            </Button>
            <Button onClick={this.props.handleSubRankComponentClose} color="primary">
                취소
            </Button>
          </DialogActions>
        </Dialog>
    );
}
}

const mapStateToProps = ({code}) => {
  const { rankList } = code;
  return { rankList }
}

export default connect(mapStateToProps, { getCodeList })(FindRank);