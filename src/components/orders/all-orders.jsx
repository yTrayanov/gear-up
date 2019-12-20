import React , {Component} from 'react';
import OrderService from '../../services/order.service';
import Order from './order';

const orderService = new OrderService();


class AllOrders extends Component{

    constructor(props){
        super(props)

        this.state = {
            data:[]
        }

    }

    async componentDidMount(){

        await orderService.getUserOrders()
            .then((orders) =>{
                this.setState({data:orders})
            })
    }

    render(){

        let allOrders = this.state.data.map((o ,i) =>(<Order key={i} data={o} />))

        return(     
            <div className='container'>
                <h1>Here are your orders</h1>
                <p>Here are all products</p>
                <ul className='row'>
                    {allOrders}
                </ul>
            </div>
        )
    }
}

export default AllOrders;