import React, { Component } from "react";
import Link from "next/link";
import _ from "lodash";
export class Navbar extends Component {
  render() {
    return (
      <nav className="rtl">
        <ul>
          <li>
            <span>لوله و اتصالات گازی سپاهان</span>
          </li>
          <li>
            <Link href="/">
              <a>
                <i className="far fa-home"></i>
                <span>صفحه اصلی</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <i className="far fa-shopping-bag"></i>
                <span>محصولات</span>
              </a>
            </Link>
            <ul className="d-flex">
              {}
              {_.chunk(this.props.products,14 ).map((item, index) => {
                return (
                  <li key={`group-${index}`}>
                    <ul>
                      {item.map((item, index) => {
                        return (
                          <li key={`item-${item.id}`}>
                            <Link href={`/products/${encodeURI(item.name)}`}>
                              <a>
                                <span>{item.name}</span>
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
        <div className="contact">
          <div>
            <div>
              <span className="number">۶۲۸۴۲۰۰۰</span>
              <span className="code">۰۲۱ </span>
            </div>
            <span>با ما در تماس باشید</span>
          </div>
          <i className="far fa-headphones-alt"></i>
        </div>
      </nav>
    );
  }
}

export default Navbar;
