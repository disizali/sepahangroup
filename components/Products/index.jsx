import React, { Component } from "react";
import Header from "./header";
import List from "./List";
export class Product extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="product-page rtl">
        <Header product={product} />
        <List types={product.Types} />
      </div>
    );
  }
}

export default Product;
