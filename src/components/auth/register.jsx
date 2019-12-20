import React,{Component} from 'react';
import AuthService from '../../services/auth.service';

class Register extends Component {

    constructor(props){
        super(props)

        this.state = {
            email:'',
            username:'',
            password:'',
            message:'',
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    async onSubmit(event){
        event.preventDefault();
        const service = new AuthService();

        await service.register(this.state.username , this.state.email , this.state.password)
                .then((data) => {
                    this.props.history.push('/login');
                }).catch(error =>{
                    this.setState({
                        message:'Invalid form'
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
                                    <input type='text' value={this.state.username}  onChange={this.onChange} className="form-control" name='username'  placeholder="Username" />
                             </div>

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
                                    <button type="submit" className="btn btn-primary btn-block" > Sign Up </button>
                                </div>
                        </form>
                        {(this.state.message)? <span>Invalid from</span> : null}
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        )
    }
}

export default Register;