import React, { Component } from "react";

export class Socials extends Component {
  render() {
    return (
      <section className="socials rtl">
        <div className="social telegram">
          <i className="fab fa-telegram"></i>
          <span>تلگرام</span>
        </div>
        <div className="social instagram">
          <i className="fab fa-instagram"></i>
          <span>اینستاگرام</span>
        </div>
        <div className="social twitter">
          <i className="fab fa-twitter"></i>
          <span>تویتتر</span>
        </div>
        <div className="social pinterest">
          <i className="fab fa-pinterest"></i>
          <span>پینترست</span>
        </div>
        <div className="social youtube">
          <i className="fab fa-youtube"></i>
          <span>یوتیوب</span>
        </div>
      </section>
    );
  }
}

export default Socials;
