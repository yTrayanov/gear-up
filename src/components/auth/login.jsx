import React, { Component } from 'react';

import AuthService from '../../services/auth.service';
const service = new AuthService();

class Login extends Component{

    constructor(props){
        super(props)

        this.state = {
            email:'',
            password:''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this); 
    }

    async onSubmit(event){
        event.preventDefault();

                    
        await service.login(this.state.email , this.state.password)
                     .then(data =>{
                         localStorage.setItem('token',data['token']);
                         localStorage.setItem('username',data['user']['username']);
                         localStorage.setItem('isAdmin',data['user']['isAdmin']);
                         localStorage.setItem('userId',data['user']['userId'])
                     });

        this.props.history.push('/products');
    }

    onChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <h1>Sign In</h1>
                        <form onSubmit ={this.onSubmit}>
                            <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                    </div>
                                    <input type='text' value={this.state.email}  onChange={this.onChange} className="form-control" name='email'  placeholder="Email" />
                                </div>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                    </div>
                                    <input type="password" value={this.state.password} onChange={this.onChange} className="form-control" name='password'  placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" href='/' className="btn btn-primary btn-block" > Sign In </button>
                                </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        )
    }
}

export default Login;