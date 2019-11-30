import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/index.scss";
export class Layout extends Component {
  render() {
    return (
      <main>
        <Navbar />
        <div className="children">{this.props.children}</div>
        <Footer posts={this.props.posts} />
      </main>
    );
  }
}

export default Layout;
