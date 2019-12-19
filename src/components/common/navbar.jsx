import React , {Component} from 'react';
import {Link  } from 'react-router-dom';

import AuthService from '../../services/auth.service';
const authService = new AuthService();

class Navbar extends Component{

    
    render(){
        return(
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                    <div className="navbar-collapse collapse" >
                        <ul className="navbar-nav mr-auto">
                            <li className='nav-link'>        
                                <Link to='/' >Gear-Up</Link>
                            </li>
                            <li className='nav-link'>
                                <Link to='/products'>Products</Link>
                            </li>
                            {!authService.isAuthenticated() ? <li className='nav-link'><Link to='/Login'>Login</Link></li> : null}
                            {!authService.isAuthenticated() ? <li className='nav-link'><Link to='/register'>Register</Link></li> : null}
                            {(authService.isAuthenticated() && !authService.isAdmin()) ? <li className='nav-link'><Link to='/cart'>Cart</Link></li> : null}
                            {(authService.isAuthenticated() && authService.isAdmin()) ? <li className='nav-link'><Link to='/create'>Create</Link></li> : null}
                            {authService.isAuthenticated() ? <li className='nav-link'><a href="/" onClick={this.props.logout}>Logout</a></li> : null}
                            
                        </ul>
                        </div>
                </nav>
            </header>
        )
    }
}

export default Navbar;