import React, {Component} from 'react';
import moment from 'moment';
import {TimePicker} from 'material-ui-pickers';

export default class TimePickers extends Component {
  state = {
    selectedDate: moment(),
  };

  handleDateChange = (date) => {
    //상위 Component의 시간 변경
    this.props.handleChangeTime(date.format("HH:mm"));
    this.setState({selectedDate: date});
  };

  render() {
    const {selectedDate} = this.state;
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