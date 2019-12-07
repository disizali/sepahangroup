import React, { Component } from "react";
export class Header extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="product-header rtl">
        <div className="product-info">
          <div>
            <span>&lt;</span>
            <h1>{product.name}</h1>
            <span>&gt;</span>
            <div>
              <img src={`/uploads/images/${product.image}`} />
              <div dangerouslySetInnerHTML={{__html : product.description}} />
            </div>
          </div>
        </div>
        <div className="product-types">
          {product.Types.length == 0 && "هنوز آیتمی اضافه نشده است"}
          {product.Types.map((item, index) => {
            return (
              <li key={index}>
                {item.code} : {item.price}
              </li>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Header;
