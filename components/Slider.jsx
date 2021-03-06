import React, { Component } from "react";
const data = [
  {
    header: "لوله فلزاطلاع از آخرین قیمت لوله های گازی",
    description:
      "لوله گازی می تواند در هر دو نوع لوله فولادی و یا پلی اتیلن باشد که جهت انتقال گاز مورد استفاده قرار می گیرند."
  },
  {
    header: "خرید و فروش لوله های گازی",
    description:
      "قیمت لوله گازی سپاهان , لوله گازی روکار , لوله گازی توکار , خرید لوله گازی , لوله گازرسانی , لوله گاز سپاهان اصفهان , لوله گاز API , آهن ملل."
  }
];
export class Slider2 extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: 1 };
    this.selected = this.setState.bind(this);
  }
  changeSelected(selected) {
    this.setState({ selected });
  }
  render() {
    const { selected } = this.state;
    return (
      <section className="slider2 rtl">
        <div>
          <h1 className={selected == 1 ? `active` : ``}>{data[0].header}</h1>
          <p className={selected == 1 ? `active` : ``}>{data[0].description}</p>
          <h1 className={selected == 2 ? `active` : ``}>{data[1].header}</h1>
          <p className={selected == 2 ? `active` : ``}>{data[1].description}</p>
          <button>جزئیات</button>
        </div>
        <i className="square" />
        <i className="square-2" />
        <div>
          <img
            src={`/images/slide1.png`}
            className={selected == 1 ? `active` : ``}
          />
          <img
            src={`/images/slide2.png`}
            className={selected == 2 ? `active` : ``}
          />
          <div className="switcher">
            <button
              className={selected == 1 ? `active` : ``}
              onClick={() => this.changeSelected(1)}
            >
              1
            </button>
            <button
              className={selected == 2 ? `active` : ``}
              onClick={() => this.changeSelected(2)}
            >
              2
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default Slider2;
