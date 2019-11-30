import React, { Component } from "react";
import Head from "next/head";
import * as api from "../../src/api";
import jsCookie from "js-cookie";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", error: false };
    this.handleChanges = this.handleChanges.bind(this);
    this.login = this.login.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
  }
  handleChanges(e) {
    this.setState({ [e.target.name]: e.target.value, error: false });
  }
  handleKeys(e) {
    e.key == "Enter" && this.login();
  }
  async login() {
    const { username, password } = this.state;
    const { changeGaranted } = this.props;
    const result = await api.login({ username, password });
    if (result == "failed") {
      return this.setState({ error: true });
    }
    if (result) {
      jsCookie.set("authtoken", result);
      changeGaranted(1);
    }
  }
  render() {
    const { username, password, error } = this.state;
    return (
      <div>
        <Head>
          <title>سپاهان گروپ - پنل مدیریت</title>
        </Head>
        <div className={`login-container ${error ? "failed" : "deactive"}`}>
          <p>UserName : </p>
          <input
            type="text"
            value={username}
            name="username"
            onChange={this.handleChanges}
            onKeyPress={this.handleKeys}
          />
          <br />
          <p>Password : </p>
          <input
            type="password"
            value={password}
            name="password"
            onKeyPress={this.handleKeys}
            onChange={this.handleChanges}
          />
          <br />
          <span style={{ opacity: error ? 1 : 0 }}>
            نام کاربری یا رمز عبور اشتباه است
          </span>
          <br />
          <button onClick={this.login}>LOGIN</button>
        </div>
      </div>
    );
  }
}
