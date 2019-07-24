import React, {Component} from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

class chipArr extends Component {

  constructor(props){
    super(props);
    this.state={
      chipData: [
        {key: 0, name: '알라딘', image: 'https://via.placeholder.com/150x150'},
        {key: 1, name: '김지니', image: 'https://via.placeholder.com/150x150'},
        {key: 2, name: '자스민', image: 'https://via.placeholder.com/120x120'},
        {key: 4, name: '자파르', image: 'https://via.placeholder.com/150x150'},
      ],
    }
  }

  handleRequestDelete = data => () => {
    const chipData = [...this.state.chipData];
    const chipToDelete = chipData.indexOf(data);
    chipData.splice(chipToDelete, 1);
    this.setState({chipData});
  };

  render() {
    if(this.props.array.length==0){
     return( <div className="d-flex flex-wrap" style={{padding:"16px"}}>
        </div>)
    }else{return (
        <div className="d-flex flex-wrap">
        {this.props.array.map(data => {
          return (
              
            <Chip
              avatar={<Avatar src={data.profileImage}/>}
              label={data.employeeName}
              key={data.employeeNo}
              onDelete={this.props.handleDelete(data)}
            />
           
          );
        })}
      </div>
    );}
  }
}

export default chipArr;

//      <div className="manage-margin d-flex flex-wrap">