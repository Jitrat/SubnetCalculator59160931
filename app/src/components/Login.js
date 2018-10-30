import React, { Component } from "react";
import 'bulma/css/bulma.css';
import axios from 'axios';

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange = (event) => {
        const {name: fieldName, value} = event.target;
        this.setState({
            [fieldName]: value
          });
    }

    login() {        
        axios.post("http://localhost:4200/user/login", {
            email: this.state.email,
            password: this.state.password
        }).then(() => {
            alert("Login succesfully");
        }).catch((error => {
            console.log(error);
            alert("เข้าสู่ระบบล้มเหลว กรุณาลองใหม่อีกครั้งค่ะ!")
        }))
    }

    render() {
        return (
<div id="root">
    <section className="section hero is-fullheight has-background-white-ter">
        <div className="hero-body">
            <div className="container">
                <div className="columns is-mobile is-centered">
                    <div className="column is-two-fifths ">
                        <div className="box">
                            <div className="media-content">
                                <h1 className="title">Welcome</h1>
                                <div className="field">
                                    <div className="control">
                                    <input name="email" className="input is-large" type="text" placeholder="Email"
                                            value={this.state.email} onChange={this.handleChange}/></div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                    <input name="password" className="input is-large" type="password" placeholder="Password"
                                            value={this.state.password} onChange={this.handleChange}/></div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                    <button className="button is-fullwidth is-primary is-large" onClick={this.login}>Log In</button></div>
                                </div>
                                <button type="button" className="button is-fullwidth is-info is-large metro">Login
                                        with Facebook</button>
                            </div>
                        </div>
                        <a className="button is-danger is-rounded is-fullwidth is-large is-hovered" href="/register">
                            Register </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
        );
    }
}

export default Login;