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
import { connect } from 'react-redux';
import { getCodeList } from 'actions/index';
import Radio from '@material-ui/core/Radio';


//props로 opne boolean 값이 true가 오면 opne이 된다.
//props로 handleSubComponentClose전달 받아서 자기 자신을 close 시켜야한다.
class FindDepart extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      checked: [1],
      search:{
        searchKeyword:"depart"
      },
      selectedValue:null,
      checkedParam:null
    };
  }

  // handleSearch = (event) => {
  //   this.setState({search:{searchKeyword:event.target.value}})
  //   this.props.getCodeList({searchKeyword:event.target.value})
  // }


  
 
    render(){

      const { departList } = this.props;
     

      const OKbuttonFunction = () => {
        this.props.checkedDepartment(this.state.checkedParam)
        this.props.handleSubDepartComponentClose();
      }

      if(departList === undefined){
        this.props.getCodeList(this.state.search);
        
      }else{
        //alert(codeList[0].codeName);
      }

      const eventHandler = (event, row) => {
        event.preventDefault();
        this.setState({selectedValue:row.codeNo, checkedParam:row})
      }

    return(        
        <Dialog open={this.props.open} onClose={this.props.handleSubDepartComponentClose} maxWidth="xl">
          <DialogTitle>부서 검색</DialogTitle>
          <DialogContent >

          <List >

          {departList && departList.map(row =>
            <ListItem button key={row.codeNo}>
              {/* <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={"/img/newyork.jpg"}/>
              </ListItemAvatar> */}
              <ListItemText className="br-break" primary={row.codeName}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemSecondaryAction>
                {/* <Checkbox color="primary"
                          onClick={event => eventHandler(event, row)}
                /> */}
                <Radio color="primary"
                  checked={this.state.selectedValue === row.codeNo}
                  onChange={event => eventHandler(event, row)}
                  value={row.codeNo}
                  name="radio button demo"
                  aria-label="B"
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
            <Button onClick={this.props.handleSubDepartComponentClose} color="primary">
                취소
            </Button>
          </DialogActions>
        </Dialog>
    );
}
}

const mapStateToProps = ({code}) => {
  const { departList } = code;
  console.log("map :: "+departList)
  return { departList }
}

export default connect(mapStateToProps, { getCodeList })(FindDepart);