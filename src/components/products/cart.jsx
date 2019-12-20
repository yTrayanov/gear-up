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


    componentDidMount(){
          productService.getUserProducts()
         .then(data =>{
            this.setState({
                products:data
            })
         });
        
    }

    
    async refresh(){
        const data = await productService.getUserProducts();
        this.setState({
            products:data
        })

        this.props.history.push('/')
        this.props.history.push('/cart')
    }

    render(){
        let allProducts = this.state.products.map((p,i) => (<Product refresh={this.refresh} canOrder='true' show='true' data={p} key={i}/>))
        

        return(
            <div className='container'>
                <h1>My Products</h1>
                <ul className="row">
                    {allProducts}
                </ul>
            </div>
    )
    }
}

export default Cart;