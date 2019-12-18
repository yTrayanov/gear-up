import React,{Component} from 'react';

class Product extends Component{

    render(){
       return( 
            <li> 
                <p>Name : {this.props.data.Name}</p>
                <p>Price :{this.props.data.Price}</p>
                <img src={this.props.data.Image} alt="#"/>
            </li>
       )
    }
}

export default Product;