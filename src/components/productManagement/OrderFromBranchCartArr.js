import React, {Component} from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import {ShoppingCart}from '@material-ui/icons';

class ChipsArray extends Component {
  state = {
    chipData: [
      {key: 0, name: 'Domnic Harris', image: 'https://via.placeholder.com/150x150'},
      {key: 1, name: 'Garry Sobars', image: 'https://via.placeholder.com/150x150'},
      {key: 2, name: 'Stella Johnson', image: 'https://via.placeholder.com/120x120'},
      {key: 3, name: 'Alex Dolgove', image: 'https://via.placeholder.com/128x128'},
      {key: 4, name: 'John Smith', image: 'https://via.placeholder.com/150x150'},
      {key: 0+5, name: 'Domnic Harris', image: 'https://via.placeholder.com/150x150'},
      {key: 1+5, name: 'Garry Sobars', image: 'https://via.placeholder.com/150x150'},
      {key: 2+5, name: 'Stella Johnson', image: 'https://via.placeholder.com/120x120'},
      {key: 3+5, name: 'Alex Dolgove', image: 'https://via.placeholder.com/128x128'},
      {key: 4+5, name: 'John Smith', image: 'https://via.placeholder.com/150x150'},
    ],
  };

  handleRequestDelete = data => () => {
    const chipData = [...this.state.chipData];
    const chipToDelete = chipData.indexOf(data);
    chipData.splice(chipToDelete, 1);
    this.setState({chipData});
  };

//   handleRequestDelete() {
//     alert('You clicked the delete icon.'); // eslint-disable-line no-alert
//   }
  
  //  handleClick() {
  //   alert('You clicked the Chip.'); // eslint-disable-line no-alert
  // }

  render() {
    if(this.props.cart===null||this.props.cart.length==0){
      return (
        <div style={{height:"55px", overflowX: "scroll", whiteSpace:"nowrap"}}>
            <ShoppingCart style={{marginTop:"0.6%"}}/>&nbsp;
        </div>
      );
    }
    return (
      <div style={{height:"55px", overflowX: "scroll", whiteSpace:"nowrap"}}>
          <ShoppingCart style={{marginTop:"0.6%"}}/>&nbsp;
        {this.props.cart.map(data => {
          return (
            <Chip
            style={{marginTop:"0px", marginRight:"5px"}}
            label={data.productName.length>6 ? data.productName.substr(0,6)+"... "+data.orderFromBranchProductQuantity+"개" : data.productName+" "+data.orderFromBranchProductQuantity+"개"}
            key={data.productNo}
            onClick={() => this.props.handleClick(data)}
            onDelete={this.props.handleDelete(data)}
             />
          );
        })}
      </div>
    );
  }
}

export default ChipsArray;