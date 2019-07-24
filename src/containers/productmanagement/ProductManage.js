import React from "react";
import GetProductList from 'components/productManagement/GetProductList';
import { connect } from 'react-redux';
import { getProductList } from "actions/ProductionManagement";
import CardBox from "components/CardBox";

class ProductionManage extends React.Component{
    
    constructor(props){
        super(props);
        console.log("123")
   
    }


        render(){
          console.log("컨테이너의 컴포넌트")
            
            const { ProductList } = this.props;

            if(ProductList === undefined){
              this.props.getProductList()
            }
              return(
                <div>
                  
                  {ProductList !== undefined ? (<GetProductList ProductList={ProductList}></GetProductList>):"error"}
              
            
                
                  </div>
              );


        }
}

  const mapStateToProps = ({productionManagement}) => {
    console.log("mapStateToProps1")
    const { ProductList } = productionManagement;
    return { ProductList };
  }
  
  
  export default connect(mapStateToProps, { getProductList })(ProductionManage);