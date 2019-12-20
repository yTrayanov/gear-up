import React, { Component } from 'react';
import OrderService from '../../services/order.service';
import ProductService from '../../services/product.service';

const orderService = new OrderService();
const productService = new ProductService();

class CreateOrder extends Component{

    constructor(props){
        super(props)

        this.state = {
            productId:'',
            address:'',
            addictionalInfo:''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    async onSubmit(event){
        event.preventDefault();
        await orderService.createOrder(this.props.match.params.id , this.state.address , this.state.addictionalInfo )
            .then(async  () =>{
                await productService.removeFromCart(this.props.match.params.id)
                    .then(() =>{
                        this.props.history.push('/cart');
                    })
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
                                <input type='text' value={this.state.address}  onChange={this.onChange} className="form-control" name='address'  placeholder="Address" />
                         </div>

                        <div className="form-group input-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                </div>
                                <input type='text' value={this.state.addictionalInfo}  onChange={this.onChange} className="form-control" name='addictionalInfo'  placeholder="addictionalInfo" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block" > Order </button>
                            </div>
                    </form>
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
        )
    }
}

export default CreateOrder;