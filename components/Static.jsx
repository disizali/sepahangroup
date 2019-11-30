import React, { Component } from "react";

export class Static extends Component {
  render() {
    return (
      <section className="static rtl">
        <div className="offer box-container">
          <div className="box-title">
            <i className="fas fa-fire"></i>
            <span>پیشنهاد داغ</span>
          </div>
          <div className="content">
            <img src="/images/pd1.jpg" width="100%" />
            <span>لوله مانیسمان</span>
          </div>
        </div>
        <div className="images box-container">
          <div className="box-title">
            <i className="fas fa-star"></i>
            <span>محبوب ترین محصولات</span>
          </div>
          <ul>
            {[1, 2, 3, 4].map((item, index) => {
              return (
                <li key={index}>
                  <img src={`/images/m${item}.jpg`} />
                  <span>محصول شماره {item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
}

export default Static;
