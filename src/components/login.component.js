import React, { Component } from "react";
import { authService } from "../services/authService";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    user: {
      email: "",
      password: "",
    },
  };

  componentDidMount(){
      this.logout()
  }

  logout(){
    authService.logout();
  }
  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.user[field] = value;
    this.setState(newState);
  };
  login = (event) => {
    event.preventDefault();
    const user = this.state.user;
    authService.login(user.email, user.password).then((user) => {
      console.log(user);
      if (user && user.status == 200) {
        this.props.history.push("temp-dashboard");
      }
    });
  };
  render() {
    return (
      <form onSubmit={this.login}>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            onChange={(event) =>
              this.handleFieldChange("email", event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            onChange={(event) =>
              this.handleFieldChange("password", event.target.value)
            }
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </form>
    );
  }
}

export default withRouter(Login);
