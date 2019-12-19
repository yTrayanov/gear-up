import React, { Component } from 'react';
import ProductService from '../../services/product.service';
const productService = new ProductService();

class EditProduct extends Component{


    constructor(props){
        super(props)

        this.state ={
            productName:'',
            price:0,
            image:'',
            id:'',
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    

    async componentDidMount(){

        await productService.getProductById(this.props.match.params.id)
            .then((data) =>{
                this.setState({
                    productName:data.name,
                    price:data.price,
                    image:data.image,
                    id:data.id
                })
            })
    }

    onChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    async onSubmit(event){
        event.preventDefault();
        
        await productService.editProduct(this.state.id , this.state.productName , this.state.price , this.state.image)
        .then(() =>{
            this.props.history.push('/products')
        });
        

    }

    render(){

        return(
            <div>
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <h1>Edit Product</h1>
                        <form onSubmit ={this.onSubmit}>

                            <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                    </div>
                                    <input type='text' value={this.state.productName}  onChange={this.onChange} className="form-control" name='productName'  placeholder="Product Name" />
                             </div>

                            <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                    </div>
                                    <input type='number' value={this.state.price}  onChange={this.onChange} className="form-control" name='price'  placeholder="Price" />
                                </div>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                    </div>
                                    <input type="text" value={this.state.image} onChange={this.onChange} className="form-control" name='image'  placeholder="image" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block" > Edit </button>
                                </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        )
    }
}

export default EditProduct;