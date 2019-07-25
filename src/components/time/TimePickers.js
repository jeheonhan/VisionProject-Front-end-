import React, {Component} from 'react';
import moment from 'moment';
import {TimePicker} from 'material-ui-pickers';

export default class TimePickers extends Component {
  state = {
    selectedDate: moment(),
    flag:false
  };

  handleDateChange = (date) => {
    //상위 Component의 시간 변경
    console.log(date)
    this.props.handleChangeTime(date.format("HH:mm"));
    this.setState({selectedDate: date});
  };

  render() {
    const { timeValue } = this.props;
    const { selectedDate } = this.state;

    if(!this.state.flag && timeValue && timeValue !== this.state.selectedDate){
      console.log(moment().format("YYYY/MM/DD")+" "+timeValue+":00")
      var time = moment().format("YYYY/MM/DD")+" "+timeValue+":00";
      this.setState({
        selectedDate:time,
        flag:true
      })
    }
    
    return (<div key="basic_time" className="picker">

      <TimePicker
        fullWidth
        value={selectedDate}
        onChange={this.handleDateChange}
        //props로 전달되는 label
        label={this.props.label && this.props.label}
      />
    </div>)
  }
}