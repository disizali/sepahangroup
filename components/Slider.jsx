import React, { Component } from "react";

export class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1
    };
    this.changeSelected = this.changeSelected.bind(this);
  }
  changeSelected(selected) {
    this.setState({ selected });
  }
  render() {
    const { selected } = this.state;
    return (
      <section className="slider">
        <div>
          <img
            src={`/images/slide1.jpg`}
            className={`${selected == 1 && "active"}`}
            width="100%"
          />
          <img
            src={`/images/slide2.jpg`}
            className={`${selected == 2 && "active"}`}
            width="100%"
          />
          <div className="switcher">
            <div className={`selector selected-${selected}`}></div>
            <button
              className={`${selected == 1 ? "active" : ""}`}
              onClick={() => this.changeSelected(1)}
            >
              اسلاید شماره ۱
            </button>
            <button
              className={`${selected == 2 ? "active" : ""}`}
              onClick={() => this.changeSelected(2)}
            >
               اسلاید شماره ۲
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default Slider;
