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
import { connect } from 'react-redux';
import { getWorkAttitudeCodeList } from 'actions/HumanResource';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';

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
class FindWorkAttitudeCode extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      checked: [1],
      search:{
        searchKeyword:null
      },
      selectedValue:null,
      checkedParam:null
    };
  }

  handleSearch = (event) => {
    this.setState({search:{searchKeyword:event.target.value}})
    this.props.getWorkAttitudeCodeList({searchKeyword:event.target.value})

  }

    render(){

      console.log(this.state.checkedParam)

      const { workAttitudeCodeList } = this.props;

      const OKbuttonFunction = () => {
        this.props.checkedWorkAttitudeCode(this.state.checkedParam)
        this.props.handleSubWorkAttitudeCodeClose();
      }
    
      if(workAttitudeCodeList === undefined){
        this.props.getWorkAttitudeCodeList(this.state.search);
      }

      const eventHandler = (event, row) => {
        event.preventDefault();
        this.setState({selectedValue:row.workAttitudeCodeNo, checkedParam:row})
      }

    return(        
        <Dialog open={this.props.open}  maxWidth="xl">
          <DialogTitle>사원 검색</DialogTitle>
          <DialogContent >

          <List >
            <TextField
            error
            id="outlined-error"
            label="근태코드 검색"
            placeholder="근태명칭"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.handleSearch}
            value={this.state.search.searchKeyword}
            fullWidth
            />

          {workAttitudeCodeList && workAttitudeCodeList.map(row =>
            <ListItem button key={row.employeeNo}>
              <span className="col-md-5">
              <ListItemText className="br-break" primary={row.workAttitudeCodeNo}/>
              </span>
              <span className="col-md-8">
              <ListItemText className="br-break" primary={row.workAttitudeCodeName}/>
              </span>
              <ListItemSecondaryAction>
                {/* <Checkbox color="primary"
                          onClick={event => eventHandler(event, row)}
                /> */}
                <Radio color="primary"
                  checked={this.state.selectedValue === row.workAttitudeCodeNo}
                  onChange={event => eventHandler(event, row)}
                  value={row.workAttitudeCodeNo}
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
            <Button onClick={this.props.handleSubWorkAttitudeCodeClose} color="primary">
                취소
            </Button>
          </DialogActions>
        </Dialog>
    );
}
}

const mapStateToProps = ({ humanResource }) => {
  const { workAttitudeCodeList } = humanResource;
  return { workAttitudeCodeList }
}

export default connect(mapStateToProps, { getWorkAttitudeCodeList })(FindWorkAttitudeCode);