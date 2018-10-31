import React, { Component } from "react";
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                email: "",
                password: "",
                cfpassword: ""
            },
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
    };
    
    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });        
    }

    submitRegister(e) {
        e.preventDefault();  
        console.log(this.state);
              
        if (this.validateForm()) {
            axios.post("https://server-buu-59160548.herokuapp.com/user/signup",{
                email: this.state.fields.email,
                password: this.state.fields.password
            }).then(() => {
                alert("สมัครสมาชิกสำเร็จ")
                this.props.history.push(`/`)
            }).catch(err => {
                console.log(err);
            })
        }

    }
    
    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }

        if (typeof fields["email"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        // if (typeof fields["password"] !== "undefined") {
        //     if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        //       formIsValid = false;
        //       errors["password"] = "*Please enter secure and strong password.";
        //     }
        // }

        if (!fields["cfpassword"]) {
            formIsValid = false;
            errors["cfpassword"] = "*Please enter your confirm password.";
        }

        if (!fields["cfpassword"] && !fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password & confirm password.";
        }

        if (fields["password"] !== fields["cfpassword"]) {
              formIsValid = false;
              errors["password"] = "*Please enter match password and confirm password";
        }
    
        this.setState({
            errors: errors
        });
        return formIsValid;
    


    }

    render() {
        return (
<section className="section hero is-fullheight has-background-white-ter">
    <div className="hero-body">
        <div className="container">
            <div className="columns is-mobile is-centered">
                <div className="column is-two-fifths">
                    <div className="box">
                        <div className="media-content">
                            <h1 className="title">Register</h1>
                            <form method="post"  name="userRegistrationForm"  onSubmit={this.submitRegister} >
                                <div className="field">
                                    <div className="errorMsg">{this.state.errors.email}</div>
                                    <div className="control">
                                        <input className="input is-large" name="email" type="text" placeholder="Email"
                                            value={this.state.fields.email} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="errorMsg">{this.state.errors.password}</div>
                                    <div className="control">
                                        <input className="input is-large" name="password" type="password" placeholder="Password"
                                            value={this.state.fields.password} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input className="input is-large" name="cfpassword" type="password" placeholder="Confirm Password"
                                            value={this.state.fields.cfpassword} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <button className="button is-fullwidth is-info is-large">Register</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
        );
    }
}

export default Register;