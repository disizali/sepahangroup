import React, { Component } from "react";
import * as api from "../../../src/api";
import Layout from "../../../components/Layout";
export default class Post extends Component {
  static async getInitialProps(context) {
    const post = await api.getPost(context.query.title);
    const products = await api.getProducts();
    return { post, products };
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
    const { post, products } = this.props;
    return (
      <Layout products={products}>
        <section className="post-page">
          <img
            src={require(`../../../public/uploads/images/${post.image}`)}
            alt={post.title}
            className="post-image"
          />
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </section>
      </Layout>
    );
  }
}
