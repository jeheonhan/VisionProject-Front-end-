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
import { getHRCardList } from 'actions/HumanResource';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import ChipArr from './chipArr'
import Divider from '@material-ui/core/Divider';


const classes = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

//props로 opne boolean 값이 true가 오면 opne이 된다.
//props로 handleSubComponentClose전달 받아서 자기 자신을 close 시켜야한다.
class FindEmployee extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      indes:1,
      checked: [1],
      search:{
        searchKeyword:""
      },
      selectedValue:null,
      checkedParam:null,
      array:[

      ]
    };
  }

  handleSearch = (event) => {
    this.setState({search:{searchKeyword:event.target.value}})
    this.props.getHRCardList({searchKeyword:event.target.value})

  }

  handleRequestDeleteList = data => () => {
    const chipData = this.state.array;
    const chipToDelete = chipData.indexOf(data);
    chipData.splice(chipToDelete, 1);
    console.log(chipData)
    this.setState({
      ...this.state,
      array : chipData
    });
  };

  

    render(){

      const { HRCardList } = this.props;

      const OKbuttonFunction = () => {
        this.props.checkedEmployee(this.state.checkedParam)
        this.props.handleSubComponentClose();
      }
    
      if(HRCardList === undefined){
        this.props.getHRCardList(this.state.search);
      }

      const eventHandler = (event, row) => {
        event.preventDefault();
        if(this.state.array.indexOf(row)===-1){
        this.setState({
          ...this.state,
          index: this.state.index+1,
          array:[
            ...this.state.array,
            row,
            ],
        })}
      }

      
 

    return( 
      <span>
        <Button style={{marginTop:"50px", float:"left"}} 
                variant="contained" 
                color="primary"
                onClick={this.props.handleOpen}>
                  결재라인 등록
        </Button>       
        <Dialog open={this.props.open} >
          <DialogTitle>결재라인등록</DialogTitle>
          <DialogContent style={{minWidth: '500px', maxWidth: '500px', minHeight:'400px', maxHeight:'400px'}}>
          선택한 사원 순서대로 결재라인이 구성됩니다.
          <List>
            <TextField
            error
            id="outlined-error"
            label="사원검색"
            placeholder="사원번호/사원명"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.handleSearch}
            value={this.state.search.searchKeyword}
            fullWidth
            />
            <ChipArr array={this.state.array} handleDelete={this.handleRequestDeleteList}/>
            <br/>
            <Divider/>
          {HRCardList && HRCardList.map(row =>
            <ListItem button key={row.employeeNo}>
              <span className="col-sm-2">
              <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={row.profileImage ? `/img/${row.profileImage}`
              :require("assets/images/placeholder.jpg")}/>
              </ListItemAvatar>
              </span>
              <span className="col-sm-4">
              <ListItemText className="br-break" primary={row.departCodeName}/>
              </span>
              <span className="col-sm-4">
              <ListItemText className="br-break" primary={row.employeeName+"("+row.employeeNo+")"}/>
              </span>
              <span className="col-sm-2">
              <ListItemText className="br-break" primary={row.rankCodeName} type="dense"/>
              </span>
              <span className="col-sm-1">
              <ListItemSecondaryAction>
                <Checkbox color="primary"
                          checked={this.state.array.indexOf(row)===-1? false:true}
                          onClick={event => eventHandler(event, row)}
                />
              </ListItemSecondaryAction>
                </span>
              </ListItem>
            )}
            
          </List>


          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleOk(this.state.array)} color="secondary">
                확인
            </Button>
            <Button onClick={this.props.handleClose} color="primary">
                취소
            </Button>
          </DialogActions>
        </Dialog>
        </span>
    );
}
}

const mapStateToProps = ({humanResource}) => {
  const { HRCardList } = humanResource;
  return { HRCardList }
}

export default connect(mapStateToProps, { getHRCardList })(FindEmployee);