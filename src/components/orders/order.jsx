import React, { Component } from 'react';
import ProductService from '../../services/product.service';

const productService = new ProductService();


class Order extends Component{


    constructor(props){
        super(props)

        this.state ={
            image:null,
            name:'',
            price:0
        }
    }

    async componentDidMount(){
        await productService.getProductById(this.props.data.product)
            .then(data =>{
                this.setState({
                    image:data.image,
                    name: data.name,
                    price:data.price
                })
            })

            console.log(this.state.image)
    }


    render(){
        return( 
        <li className="col-md-6 orders"> 
            <div>    
                <p>Adress : {this.props.data.address}</p>
                <p>Information :{this.props.data.addictionalInfo}</p>
            </div>
            <div>
                <img src={this.state.image} alt=""/>
                <p>{this.state.name}</p>
                <p>{this.state.price}</p>
            </div>
        </li>
        )
    }
}

export default Order;