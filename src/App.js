import React, { Component } from 'react';
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

import AdminRoute from './components/common/Routes/admin-route'
import PrivateRoute from './components/common/Routes/private-route';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      isLogged:false,
    }
  }

  render(){
    return (
      <div className="App">
        <Navbar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/products' component={AllProducts}/>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute path='/cart' component={Cart} />
            <AdminRoute path='/create' component={CreateProduct}/>
            <AdminRoute path='/edit/:id' component={EditProduct}/>
          </Switch>
      </div>
    );
  }
}

export default App;
