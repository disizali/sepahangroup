import React, { Component } from "react";
import Login from "../components/Dashboard/Login.jsx";
import Panel from "../components/Dashboard/Panel/Index.jsx";
import "../styles/dashboard/index.scss";
import jsCookie from "js-cookie";
import * as api from "../src/api";
import Head from "next/head";
export class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      garanted: 0,
      loading: true
    };
  }
  async componentDidMount() {
    const token = jsCookie.get("authtoken");
    if (token) {
      const result = await api.login({ token });
      if (result == "verified") {
        this.setState({ garanted: 1, loading: false });
      } else if (result == "failed") {
        this.setState({ garanted: 0, loading: false });
      }
    }
    if (token == undefined) this.setState({ loading: false });
  }

  changeGaranted(garanted) {
    this.setState({ garanted });
  }

  render() {
    const { garanted, loading } = this.state;
    return (
      <div>
        <Head>
          <title>لوله و اتصالات گازی سپاهان</title>
        </Head>
        {garanted == 0 && loading == false && (
          <Login changeGaranted={this.changeGaranted.bind(this)} />
        )}
        {garanted == 1 && <Panel />}
        {garanted == -1 && "failed"}
        {loading == true && "loading"}
      </div>
    );
  }
}

export default dashboard;
