import React, { Component } from "react";

export class Employees extends Component {
  render() {
    return (
      <section className="employees rtl">
        <div className="box-container">
          <div className="box-title">
            <i className="fas fa-users"></i>
            <span>تیم ما</span>
          </div>
          <ul>
            {[1, 2, 3, 4].map((item, index) => {
              const red = Math.floor(Math.random() * 255);
              const green = Math.floor(Math.random() * 255);
              const blue = Math.floor(Math.random() * 255);
              return (
                <li key={index}>
                  <img src={`/images/face${index + 1}.jpg`} />
                  <div>
                    <span>کارمند شماره {item}</span>
                    <span>مسئول بخش شماره {item}</span>

                    <strong>
                      {index == 0 && "09123480078"}
                      {index == 1 && "info@sepahanloleh.ir"}
                      {index == 2 && "02166237104"}
                      {index == 3 && "02166248902"}
                    </strong>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
}

export default Employees;
