import React, { Component } from "react";

export class List extends Component {
  render() {
    const { types } = this.props;
    return (
      <div className="product-types">
        {types.length == 0 && (
          <span className="no-type">هنوز آیتمی اضافه نشده است</span>
        )}
        <table>
          {types.length != 0 && (
            <thead>
              <tr>
                <th>کد</th>
                <th>نام</th>
                <th>ضخامت</th>
                <th>عرض</th>
                <th>برند</th>
                <th>حالت</th>
                <th>تحویل</th>
                <th>واحد</th>
                <th>قیمت</th>
              </tr>
            </thead>
          )}
          <tbody>
            {types.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.code == 0 ? "-" : item.code}</td>
                  <td>{item.name == 0 ? "-" : item.name}</td>
                  <td>{item.thinkness == 0 ? "-" : item.thinkness}</td>
                  <td>{item.width == 0 ? "-" : item.width}</td>
                  <td>{item.brand == 0 ? "-" : item.brand}</td>
                  <td>{item.mood == 0 ? "-" : item.mood}</td>
                  <td>{item.deliver == 0 ? "-" : item.deliver}</td>
                  <td>{item.unit == 0 ? "-" : item.unit}</td>
                  <td>{item.price == 0 ? "تماس بگیرید" : item.price.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
