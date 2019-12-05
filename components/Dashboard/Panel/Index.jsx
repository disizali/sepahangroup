import React, { Component } from "react";
import Product from "./Product.jsx";
import Blog from "./Blog.jsx";

export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 2
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
        <ul className="tabs rtl" style={{ display: "flex", listStyle: "none" }}>
          <li
            className={`${tab == 1 && `active`}`}
            onClick={() => this.changeTab(1)}
          >
            مقالات
          </li>
          <li
            className={`${tab == 2 && `active`}`}
            onClick={() => this.changeTab(2)}
          >
            محصولات
          </li>
        </ul>
        {this.getTabPanel()}
      </div>
    );
  }
}

export default Index;
