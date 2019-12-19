import React, { Component } from 'react';
import Product from './product';
import ProductService from '../../services/product.service';

const productService = new ProductService();

class Cart extends Component{

    constructor(props){
        super(props)

        this.state ={
            products:[],
        }

        this.refresh = this.refresh.bind(this);
    }


    async componentDidMount(){
        const data = await productService.getUserProducts();
        this.setState({
            products:data
        })
        
    }

    
    refresh(){
        this.props.history.push('/');
        this.props.history.push('/products');
    }

    render(){
        let allProducts = this.state.products.map((p,i) => (<Product refresh={this.refresh} show='true' data={p} key={i}/>))
        console.log(allProducts)

        return(
            <div className='container'>
                <p>Here are all products</p>
                <ul>
                    {allProducts}
                </ul>
            </div>
    )
    }
}

export default Cart;