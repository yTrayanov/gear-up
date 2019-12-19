import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import ProductService from '../../services/product.service';

const authService = new AuthService();
const productService = new ProductService();

class Product extends Component{

    constructor(props){
        super(props)

        this.state ={
            isAdded :'false',
            productId:''
        }

        this.addToCart = this.addToCart.bind(this);
        this.remove = this.remove.bind(this);
    }

    async addToCart(){
        await productService.addToUserCart(this.props.data._id);
        this.props.refresh();
    }

    async componentDidMount(){
        const checkIfAdded = await productService.checkIfAlreadyInCart(this.props.data._id);
        this.setState({isAdded:checkIfAdded});
        
        this.setState({productId:this.props.data._id});
    }

    async remove(){
        if(authService.isAuthenticated() && authService.isAdmin()){
            await productService.deleteProduct(this.state.productId);
        }
        else if(authService.isAuthenticated() && !authService.isAdmin()){
            await productService.removeFromCart(this.state.productId);
        }

        
        this.props.refresh();
    }

    render(){
        
       return( 
            <li> 
                <p>Name : {this.props.data.name}</p>
                <p>Price :{this.props.data.price}</p>
                <img src={this.props.data.image} alt="#"/>
                {(authService.isAdmin() && authService.isAuthenticated()) ? <Link to={'edit/' + this.props.data._id} className='btn-primary' >Edit</Link>:null }
                {(authService.isAuthenticated() && this.state.isAdded ==='false' && !authService.isAdmin()) ? <button onClick={this.addToCart} className='btn-primary' >Add to cart</button>:null }
                {(authService.isAuthenticated() && this.state.isAdded ==='true' ) ? <span className='btn-primary' >Already Added</span>:null }
                {(authService.isAuthenticated() && this.props.show === 'true') ? <button onClick={this.remove} className='btn-primary' >Remove</button>:null }

            </li>
       )
    }
}

export default Product;