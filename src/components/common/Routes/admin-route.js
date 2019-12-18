import React from 'react';
import {Redirect , Route} from 'react-router-dom';
import AuthService from '../../../services/auth.service';

const service = new AuthService();

const AdminRoute = ({component:Component ,isAdmin, ...res}) =>(
    <Route  {...res} render={props =>(
        service.isAdmin()? (<Component {...props} />)
                        : (<Redirect to={{pathname:'/', state: {from:props.location}}} />)
    )}/>
)

export default AdminRoute;
