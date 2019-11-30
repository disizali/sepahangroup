import React, { Component } from "react";
const data = [
  {
    header: "لوله فلزی",
    description:
      "خرید لوله فلزی از سپاهان گروپ اولین و تخصصی ترین گروه ایران در صنعت فروش آهن آلات"
  },
  {
    header: "لوله PVC",
    description:
      "خرید لوله PVC از سپاهان گروپ اولین و تخصصی ترین گروه ایران در صنعت فروش آهن آلات"
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
