import React, { Component } from 'react';
import ProductService from '../../services/product.service'

const service = new ProductService();

class CreateProduct extends Component{

    constructor(props){
        super(props)

        this.state ={
            productName:'',
            image:'',
            price:0
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    async onSubmit(event){
        event.preventDefault();

       await service.createProduct(this.state.productName , this.state.image , this.state.price)
                    .then(() =>{
                        console.log('Product created!!');
                    })

    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <h1>Sign Up</h1>
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
                                    <input type='text' value={this.state.image}  onChange={this.onChange} className="form-control" name='image'  placeholder="Image" />
                                </div>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                    </div>
                                    <input type="number" value={this.state.password} onChange={this.onChange} className="form-control" name='price'  placeholder="Price" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block" > Create </button>
                                </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        )
    }
}

export default CreateProduct;