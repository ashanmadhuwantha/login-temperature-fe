import React, { Component } from "react";
import {authService} from "../services/authService";

export default class SignUp extends Component {
    state = {
        user:{
            name:"",
            email:"",
            password:"",
            password_confirmation:""

        }
    }
    handleFieldChange = (field, value) => {
        const newState = { ...this.state };
        newState.user[field] = value;
        this.setState(newState);
      };
    register=(event)=>{
        event.preventDefault();
        console.log(this.state.user);
        const user = this.state.user;
        //return authService.register(user);
        authService.register(user).then((user) => {
            console.log(user);
            if (user) {
              this.props.history.push("sign-in");
            }
          });

    }
    render() {
        return (
            <form onSubmit={this.register}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="First name" name="name" onChange={(event) =>
                      this.handleFieldChange("name", event.target.value)
                    }/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={(event) =>
                      this.handleFieldChange("email", event.target.value)
                    }/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={(event) =>
                      this.handleFieldChange("password", event.target.value)
                    }/>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm password" name="password_confirmation" onChange={(event) =>
                      this.handleFieldChange("password_confirmation", event.target.value)
                    }/>
                </div>
                
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            </form>
        );
    }
}