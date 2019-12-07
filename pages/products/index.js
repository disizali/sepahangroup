import React, { Component } from "react";
import Layout from "../../../components/Layout";
import * as api from "../../../src/api";
import Product from "../../../components/Products/index";
export default class ProductPage extends Component {
  static async getInitialProps(context) {
    const { name } = context.query;
    const posts = await api.getPosts();
    const products = await api.getProducts();
    return { posts, products };
  }
  componentDidMount() {
    const nav = document.getElementsByTagName("nav")[0];
    nav.style.width = `calc(100% - 30px + ${window.pageYOffset}px)`;
    nav.style.margin = `${Math.floor(15 - window.pageYOffset / 4)}px`;
    window.addEventListener("scroll", e => {
      const nav = document.getElementsByTagName("nav")[0];
      const pageY = window.pageYOffset <= 60 ? window.pageYOffset : 60;
      nav.style.width = `calc(100% - ${30 - pageY / 2}px`;
      nav.style.margin = `${Math.floor(15 - pageY / 4)}px`;
      nav.style.height = `${Math.floor(50 + pageY / 3)}px`;
    });
  }
  render() {
    return (
      <Layout products={this.props.products} posts={this.props.posts}>
        <Product product={this.props.product} />
      </Layout>
    );
  }
}
