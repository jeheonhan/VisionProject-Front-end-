import React, { Component } from "react";
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
import Button from '@material-ui/core/Button';

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


class CheckboxListSecondary extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      checked: [1],
      search:{
        searchKeyword:""
      }
    };
  }
  
  handleSearch = (event) => {
    this.setState({search:{searchKeyword:event.target.value}})
    this.props.getHRCardList({searchKeyword:event.target.value})

  }
  

  // handleToggle = (event, value) => {
  //   const {checked} = this.state;
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   this.setState({
  //     checked: newChecked,
  //   });
  // };

  render() {


    const { HRCardList } = this.props;

    if(HRCardList === undefined){
      this.props.getHRCardList(this.state.search);
    }

    const eventHandler = (event, row) => {
      event.preventDefault();
      this.props.FnCheckedParam(row)
    }

    return (
      <List >
    
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
          />

        {HRCardList && HRCardList.map(row =>
          <ListItem button key={row.employeeNo}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={"http://localhost:8080/img/newyork.jpg"}/>
            </ListItemAvatar>
            <ListItemText className="br-break" primary={row.employeeName}/>
            <ListItemSecondaryAction>
              <Checkbox color="primary"
                        onClick={event => eventHandler(event, row)}
                        //onClick={event => this.handleToggle(event, row.employeeNo)}
                        //checked={this.state.checked.indexOf(row.employeeNo) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        )}

      </List>
      
    );
  }
}

const mapStateToProps = ({humanResource}) => {
  const { HRCardList } = humanResource;
  return { HRCardList }
}

export default connect(mapStateToProps, { getHRCardList })(CheckboxListSecondary);