import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckboxListSecondary from 'components/checkBox/CheckboxListSecondary';
import Button from '@material-ui/core/Button';

//props로 opne boolean 값이 true가 오면 opne이 된다.
//props로 handleSubComponentClose전달 받아서 자기 자신을 close 시켜야한다.
class FindEmployee extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

      var checkedParam = null;

      const OKbuttonFunction = () => {
        this.props.checkedEmployee(checkedParam)
        this.props.handleSubComponentClose();
      }

      const FnCheckedParam = (data) => {
        console.log("FnCheckedParam :: "+data.employeeName);
        checkedParam = data;
      }

    return(
        <Dialog open={this.props.open}  maxWidth="xl">
          <DialogTitle>사원 검색</DialogTitle>
          <DialogContent >
            <CheckboxListSecondary callBackCheckedEmployee={this.callBackCheckedEmployee}
                                   FnCheckedParam={FnCheckedParam} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleSubComponentClose} color="primary">
                Cancel
                </Button>
                <Button onClick={OKbuttonFunction} color="secondary">
                Subscribe
            </Button>
          </DialogActions>
        </Dialog>
    );
}
}

export default FindEmployee;