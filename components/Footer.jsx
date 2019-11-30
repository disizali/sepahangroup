import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <footer className="rtl">
        <div className="footer-links">
          <h3>لینک های مرتبط</h3>
          <ul>
            <li>قیمت آهن</li>
            <li>قیمت لوله</li>
          </ul>
        </div>
        <div className="footer-blog">
          <h3>آخرین مقالات</h3>
          <ul>
            {this.props.posts.map((item, index) => {
              return <li key={index}>{item.title}</li>;
            })}
          </ul>
        </div>
        <div className="footer-contact">
          <h3>تماس با ما</h3>
          <ul>
            <li>
              <span>آدرس</span>
              <span>ایران - تهران</span>
            </li>
            <li>
              <span>تلفن</span>
              <span>۰۲۱-۶۲۸۴۲۰۰۰</span>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;
