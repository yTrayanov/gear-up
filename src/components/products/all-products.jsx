import React , {Component} from 'react';
import Product from './product';
import ProductService from '../../services/product.service';
import AuthService from '../../services/auth.service';

const productService = new ProductService();
const authService = new AuthService();

class AllProducts extends Component{

    constructor(props){
        super(props);

        this.state = {
            data:[],
            show:'false'
        }

        this.refresh = this.refresh.bind(this);
    }

    
    async componentDidMount(){
        await productService.getAllProducts()
        .then(result => {
            this.setState({data:result})
        });

        if(authService.isAuthenticated() && authService.isAdmin()){
            this.setState({show:'true'})
        }
        
    }

    refresh(){
        this.props.history.push('/');
        this.props.history.push('/products')
    }

    

    render(){

        let allProducts = this.state.data.map((p,i) => (<Product 
                refresh={this.refresh}
                show={this.state.show}
                canOrder='false'
                data={p} 
                key={i}/>))

        return(
            <div className='container'>
                <p>Here are all products</p>
                <ul className='row'>
                    {allProducts}
                </ul>
            </div>
        )
    }

    
}

export default AllProducts;