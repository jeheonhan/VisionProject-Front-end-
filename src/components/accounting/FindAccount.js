import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from '@material-ui/core/Radio';
import { connect } from 'react-redux';
import { getCheckAccountList, cleanStoreState } from 'actions/index';


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

class FindAccount extends React.Component {

  constructor(props) {
    
    super(props);

    //sql에서 and와 or는 우선순위가 있다. and가 더 높기 때문에 and 또는 or가 하나의 묶음인 경우에는 and 앞 ()를 써서 하나로 합쳐주자
    //AND (account_no LIKE '%'||#{searchKeyword}||'%'OR LOWER(reference) LIKE '%'||#{searchKeyword}||'%')
    this.state = {
      search:{
        searchKeyword : "",
        searchCondition : "06",
        usageCondition : "01"
      },
      selectedValue: undefined,
    }
  };

  handleChange = event => {
    this.setState({selectedValue: event.target.value});
    console.log(this.state);
  };

  handleSearch = (event) => {
    this.setState({search:{...this.state.search, searchKeyword:event.target.value}});
      this.props.getAccountList(this.state.search);
  }

  submitButton = () => {
    this.props.getAccountNo(this.state.selectedValue);
    this.props.handleFindAccountClose();
  }

  render() {

    const { checkAccountList } = this.props;
    
    if(checkAccountList === undefined){
      this.props.getCheckAccountList(this.state.search);
    }


    return (
      <div>
        {/* Dialog의 onClose는 다이얼로그를 클릭하면 꺼지게 하는 속성  */}
        <Dialog open={this.props.open}>
            <DialogTitle>계좌검색</DialogTitle>
              <DialogContent style={{minWidth: '500px', maxWidth: '500px', minHeight:'400px', maxHeight:'400px'}}>
                <List>
                  
                  <TextField
                    error
                    id="outlined-error"
                    label="계좌검색"
                    placeholder="계좌번호/참고"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleSearch}
                    value={this.state.search.searchKeyword}
                    fullWidth
                    helperText="계좌번호 또는 참고로 검색가능합니다"
                  />

                  {checkAccountList && checkAccountList.map(row =>
                    <ListItem button key={row.accountRegNo}>
                      <ListItemText className="br-break" primary={row.accountNo}/>
                      &nbsp;&nbsp;&nbsp;
                      <ListItemText className="br-break" primary={row.bankCodeName}/>
                      &nbsp;&nbsp;&nbsp;
                      <ListItemSecondaryAction>
                        <Radio color="primary"
                          checked={this.state.selectedValue == row.accountNo}
                          onChange={this.handleChange}
                          value={row.accountNo}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>,
                  )}
                </List>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.submitButton} color="secondary">
                  확인
                </Button>
                <Button onClick={this.props.handleFindAccountClose} color="primary">
                  취소
                </Button>
              </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ accounting }) => {
  const { checkAccountList } = accounting;
  
  return { checkAccountList }
}

export default connect(mapStateToProps, { getCheckAccountList, cleanStoreState })(FindAccount);