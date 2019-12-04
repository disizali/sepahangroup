import React, { Component } from "react";
import Layout from "../../../components/Layout";
import * as api from "../../../src/api";
export default class Product extends Component {
  static async getInitialProps(context) {
    const posts = await api.getPosts();
    const products = await api.getProducts();
    return { posts, products };
  }
  render() {
    return (
      <Layout products={this.props.products} posts={this.props.posts}>
        <div>
            test
        </div>
      </Layout>
    );
  }
}
