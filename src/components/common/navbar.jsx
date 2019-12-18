import React , {Component} from 'react';
import {Link , NavLink , BrowserRouter as Router } from 'react-router-dom';

class Navbar extends Component{



    render(){
        return(
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <Router>
                    <div className="navbar-collapse collapse" >
                        <ul className="navbar-nav mr-auto">
                            <li className='nav-link'>        
                                <Link to='/' >Gear-Up</Link>
                            </li>
                            <li className='nav-link'>
                                <NavLink to='/products'>Products</NavLink>
                            </li>
                        </ul>
                        </div>
                    </Router>
                </nav>
            </header>
        )
    }
}

export default Navbar;