import React from 'react';
import {Redirect , Route} from 'react-router-dom';
import AuthService from '../../../services/auth.service';

const service = new AuthService();

const PrivateRoute = ({component:Component ,isAdmin, ...res}) =>(
    <Route  {...res} render={props =>(
        service.isAuthenticated()? (<Component {...props} />)
                        : (<Redirect to={{pathname:'/login', state: {from:props.location}}} />)
    )}/>
)

export default PrivateRoute;
