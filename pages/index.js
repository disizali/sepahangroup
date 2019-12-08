import React, { Component } from "react";
import Layout from "../components/Layout";
import Slider2 from "../components/Slider2";
import Static2 from "../components/Static2";
import Employees from "../components/Employees";
import Image from "../components/Image";
import Socials from "../components/Socials";
import Blog from "../components/Blog";
import * as api from "../src/api";
import Head from "next/head";
import About from "../components/About";
export class index extends Component {
  static async getInitialProps(context) {
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
      <Layout posts={this.props.posts} products={this.props.products}>
        <Head>
          <title>لوله و اتصالات گازی سپاهان</title>
        </Head>
        <Slider2 />
        <Static2 />
        <About />
        <Employees />
        <Image />
        <Socials />
        <Blog posts={this.props.posts} />
      </Layout>
    );
  }
}

export default index;
