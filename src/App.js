import React, { Component , Fragment  } from 'react';
import './App.css';
import {Switch , Route }   from 'react-router-dom';

import Navbar from './components/common/navbar'
import HomePage from './components/common/home-page';
import Login from './components/auth/login';
import Register from './components/auth/register';

import AllProducts from './components/products/all-products';
import CreateProduct from './components/products/create-product';
import Cart from './components/products/cart';
import EditProduct from './components/products/edit-product';

import CreateOrder from './components/orders/create-order';
import AllOrders from './components/orders/all-orders';

import AdminRoute from './components/common/Routes/admin-route'
import PrivateRoute from './components/common/Routes/private-route';
import UnloggedRoute from './components/common/Routes/unlogged-routes';

import AuthService from './services/auth.service';
const authService = new AuthService(); 

class App extends Component {

  constructor(props){
    super(props)


    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  logout(){
    window.localStorage.clear();
    this.setState({
      islogged:'false'
    })
  }

  login(){
    this.setState({
      islogged:'true'
    })
  }

  


  render(){
    return (
      <div className="App">
        <Fragment>
            <Navbar logout={this.logout} login={this.login}/>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/products' component={AllProducts}/>
              <UnloggedRoute exact path='/login' component={Login} />
              <UnloggedRoute exact path='/register' component={Register} />
              <PrivateRoute exact path='/cart'  component={Cart} />
              <PrivateRoute exact path='/orders'  component={AllOrders} />
              <PrivateRoute exact path='/order/create/:id' component={CreateOrder} />
              <AdminRoute exact path='/create' component={CreateProduct}/>
              <AdminRoute exact path='/edit/:id' component={EditProduct}/>
              <Route Component={HomePage} />
            </Switch>
        </Fragment>
      </div>
    );
  }
}

export default App;
