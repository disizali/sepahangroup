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
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.thinkness}</td>
                  <td>{item.width}</td>
                  <td>{item.brand}</td>
                  <td>{item.mood}</td>
                  <td>{item.deliver}</td>
                  <td>{item.unit}</td>
                  <td>{item.price}</td>
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
