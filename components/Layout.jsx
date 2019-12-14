import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/index.scss";
import Head from "next/head";
export class Layout extends Component {
  render() {
    return (
      <main>
        <Head>
          <meta
            name="google-site-verification"
            content="Ah5_UiqXvbTVeH3Jw2xDTpDkZYLivLrFn7PEXxF1wXI"
          />
        </Head>
        <Navbar products={this.props.products} />
        <div className="children">{this.props.children}</div>
        <Footer posts={this.props.posts} />
      </main>
    );
  }
}

export default Layout;
