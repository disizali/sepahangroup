import React, { Component } from "react";
import Header from "./header";

export class Product extends Component {
  render() {
    const { product } = this.props;
    return (
      <div>
        <Header product={product} />
      </div>
    );
  }
}

export default Product;
