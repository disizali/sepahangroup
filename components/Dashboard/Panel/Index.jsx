import React, { Component } from "react";
import Product from "./Product.jsx";
import Blog from "./Blog.jsx";

export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1
    };
    this.changeTab = this.changeTab.bind(this);
    this.getTabPanel = this.getTabPanel.bind(this);
  }
  changeTab(tab) {
    this.setState({ tab });
  }
  getTabPanel() {
    const { tab } = this.state;
    switch (tab) {
      case 1: {
        return <Blog />;
      }
      case 2: {
        return <Product />;
      }
    }
  }
  render() {
    const { tab } = this.state;
    return (
      <div>
        <ul style={{ display: "flex", listStyle: "none" }}>
          <li>
            <button
              onClick={() => this.changeTab(1)}
              style={{
                backgroundColor: tab == 1 ? "cyan" : "white"
              }}
            >
              Blog
            </button>
          </li>
          <li>
            <button
              onClick={() => this.changeTab(2)}
              style={{
                backgroundColor: tab == 2 ? "cyan" : "white"
              }}
            >
              Products
            </button>
          </li>
        </ul>
        <hr />
        {this.getTabPanel()}
      </div>
    );
  }
}

export default Index;
