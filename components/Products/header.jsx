import React, { Component } from "react";
export class Header extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="product-header rtl">
        <div>
          <span>«</span>
          <h1>{product.name}</h1>
          <span>»</span>
            <div>
              <img src={`/uploads/images/${product.image}`} />
              <div dangerouslySetInnerHTML={{__html : product.description}} />
            </div>
        </div>
      </div>
    );
  }
}

export default Header;
