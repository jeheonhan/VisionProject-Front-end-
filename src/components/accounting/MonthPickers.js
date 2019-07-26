import React, {Component} from 'react';
import moment from 'moment';
import {DatePicker} from 'material-ui-pickers';

export default class MonthPickers extends Component {
  state = {
    selectedDate: moment().format('YYYY/MM'),
  };

  handleDateChange = (date) => {
    this.setState({selectedDate: date.format('YYYY/MM')});
    this.props.callBackDateChange(date.format('YYYY/MM'));
  };

  render() {
    const {selectedDate} = this.state;

    return (
      <div key="basic_day" className="picker">
        <DatePicker
          label={"급여등록"}
          margin="normal"
          fullWidth
          value={selectedDate}
          format={'YYYY/MM'}
          onChange={this.handleDateChange}
          animateYearScrolling={false}
          leftArrowIcon={<i className="zmdi zmdi-arrow-back"/>}
          rightArrowIcon={<i className="zmdi zmdi-arrow-forward"/>}
        />
      </div>
    )

  }
}