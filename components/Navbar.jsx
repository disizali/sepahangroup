import React, { Component } from "react";
import Link from "next/link";
export class Navbar extends Component {
  render() {
    return (
      <nav className="rtl">
        <ul>
          <li>
            <span>SEPAHANGROUP</span>
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
            <ul>
              <li>x1</li>
              <li>x2</li>
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
