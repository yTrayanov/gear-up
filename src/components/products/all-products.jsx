import React , {Component} from 'react';
import Product from './product';
import ProductService from '../../services/product.service';
import ProductViewModel from '../../view-models/product-view-model';

const service = new ProductService();

class AllProducts extends Component{

    constructor(props){
        super(props);

        this.state = {
            data:[]
        }
    }

    
    async componentDidMount(){
        let res ='';
        await service.getAllProducts()
        .then(result => {
            res = result;
        });

        let products = [];

        for(let p of res){
            products.push(new ProductViewModel(p.name , p.image , p.price));
        }

        this.setState({data:products})
    }

    render(){

        let allProducts = this.state.data.map((p,i) => (<Product data={p} key={i}/>))

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

export default AllProducts;