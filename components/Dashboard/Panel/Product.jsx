import React, { Component } from "react";
import * as api from "../../../src/api";
export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedImage: false,
      image: "",
      floating: false,
      editableType: false,
      product: { Types: [] }
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.sendProduct = this.sendProduct.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.handlePriceChanges = this.handlePriceChanges.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDescriptionChanges = this.handleDescriptionChanges.bind(this);
    this.startUpdateType = this.startUpdateType.bind(this);
    this.cancelUpdateType = this.cancelUpdateType.bind(this);
    this.updateType = this.updateType.bind(this);
    this.savePrices = this.savePrices.bind(this);
    this.sendType = this.sendType.bind(this);
  }
  async componentDidMount() {
    const editor = document.querySelector("#editor p");
    editor.classList = [...editor.classList, "ql-align-right ql-direction-rtl"];
    const products = await api.getProducts();
    this.setState({
      products,
      product: products[0]
    });
  }
  handleChanges(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleDescriptionChanges(productDescription) {
    this.setState({ productDescription });
  }
  handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      this.setState({ image: e.target.files[0] });
      var reader = new FileReader();
      reader.onload = e => {
        this.setState({ selectedImage: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  selectProduct(id) {
    this.setState({ product: this.state.products.find(item => item.id == id) });
    const typesTable = document.getElementById("types-table");
    typesTable.scrollIntoView();
  }
  handlePriceChanges(e) {
    this.setState({ [e.target.name]: e.target.value, floating: true });
  }
  savePrices() {
    console.log(this.state);
  }
  async sendProduct() {
    const { productName, productDescription, image, products } = this.state;
    if (!productName || !productDescription || !image)
      return alert("لطفا ورودی های خودتون رو چک کنید");
    const product = await api.sendProduct({
      name: productName,
      description: productDescription,
      image
    });
    this.setState({
      productName: "",
      productDescription: "",
      image: "",
      selectedImage: false,
      products: [{ ...product, Types: [] }, ...products]
    });
  }
  modules() {
    return {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ header: 1 }, { header: 2 }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" }
        ],
        [{ direction: "rtl" }],
        [{ align: [] }],
        [{ color: [] }],
        ["image", "link"],
        [{ background: [] }],
        ["clean"]
      ]
    };
  }
  formats() {
    return [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "align",
      "link",
      "color",
      "background",
      "direction",
      "image"
    ];
  }
  async sendType() {
    const {
      typeCode,
      typeName,
      typeThinkness,
      typeWidth,
      typeBrand,
      typeMood,
      typeDeliver,
      typeUnit,
      typePrice,
      product
    } = this.state;
    if (
      !typeCode ||
      !typeName ||
      !typeThinkness ||
      !typeWidth ||
      !typeBrand ||
      !typeMood ||
      !typeDeliver ||
      !typeUnit ||
      !typePrice
    )
      return alert("لطفا ورودی های خودتون رو چک کنید");

    const type = await api.sendType({
      code: typeCode,
      name: typeName,
      thinkness: typeThinkness,
      width: typeWidth,
      brand: typeBrand,
      mood: typeMood,
      deliver: typeDeliver,
      unit: typeUnit,
      price: typePrice,
      ProductId: product.id
    });
    this.setState({ product: { ...product, Types: [type, ...product.Types] } });
  }
  startUpdateType(id) {
    const editableType = this.state.product.Types.find(item => item.id == id);
    this.setState({ editableType });
  }
  cancelUpdateType() {
    Object.entries(this.state).forEach((item, index) => {
      if (item[0].startsWith("update")) {
        this.setState({ [item[0]]: undefined });
      }
    });
    this.setState({ editableType: false });
  }
  async updateType() {
    const { editableType, product, products } = this.state;
    let updatedData = { targetId: editableType.id };
    Object.entries(this.state).forEach((item, index) => {
      if (item[0].startsWith("update")) {
        updatedData[item[0].replace("update", "").toLocaleLowerCase()] =
          item[1];
      }
    });
    const result = await api.updateType(updatedData);
    if (result == "done") {
      const newProducts = products.map((productItem, index) => {
        if (productItem.id == product.id) {
          productItem.Types.map(typeItem => {
            if (typeItem.id == editableType.id) {
              Object.entries(updatedData).forEach(updatedItem => {
                typeItem[updatedItem[0]] = updatedItem[1];
              });
            }
            return typeItem;
          });
        }
        return productItem;
      });
      console.log(newProducts);
      this.setState({
        product: newProducts.find(item => item.id == product.id),
        products: newProducts
      });
      this.cancelUpdateType();
    }
  }
  render() {
    const { editableType } = this.state;
    const { products, product, selectedImage } = this.state;
    const ReactQuill = require("react-quill");

    return (
      <div
        className={`dashboard-container rtl ${editableType ? "blured" : ""}`}
      >
        <div className={`dashboard-actions ${editableType ? "blured" : ""}`}>
          <h1>افزودن گروه جدید :</h1>
          <p>تصویر</p>
          <label
            className="image-selector"
            htmlFor={`product-image`}
            style={{
              backgroundImage: selectedImage
                ? `url(${selectedImage})`
                : "transparent"
            }}
          >
            +
          </label>
          <input
            type="file"
            name="image"
            id="product-image"
            onChange={this.handleImageChange.bind(this)}
          />
          <p>نام</p>
          <input
            type="text"
            name="productName"
            value={this.state.productName || ""}
            onChange={this.handleChanges}
          />
          <p>توضیحات</p>
          <div id="editor">
            <ReactQuill
              value={this.state.productDescription}
              className="panel-editor rtl text-center text-dark"
              theme="snow"
              modules={this.modules()}
              formats={this.formats()}
              style={{ direction: "rtl" }}
              onChange={this.handleDescriptionChanges.bind(this)}
            />
          </div>
          <br />
          <button onClick={this.sendProduct} className="primary">
            ارسال
          </button>
        </div>
        <div className={`product-list ${editableType ? "blured" : ""}`}>
          <div className="groups">
            <h2>لیست گروه ها</h2>
            <div>
              {products.length == 0 && "هنوز محصولی اضافه نشده است"}
              {products.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`product-item ${
                      product.id == item.id ? `active` : ``
                    }`}
                    onClick={() => this.selectProduct(item.id)}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2>انواع محصولات این گروه</h2>
            {product.Types.length == 0 && "این دسته بندی هیچ آیتمی ندارد"}
            <table id="types-table">
              {product.Types.length != 0 && (
                <thead className="type-header">
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
                {product.Types.map((item, index) => {
                  return (
                    <tr
                      key={item.id}
                      className="type-item"
                      onClick={() => this.startUpdateType(item.id)}
                    >
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
            <hr />
            <div className="new-product">
              <input
                type="text"
                name="typeCode"
                placeholder="کد"
                className="input-type col-lg-1 col-md-6 col-sm-12"
                onChange={this.handleChanges}
              />
              <input
                type="text"
                name="typeName"
                placeholder="نام"
                className="input-type col-lg-1 col-md-6 col-sm-12"
                onChange={this.handleChanges}
              />
              <input
                type="text"
                name="typeThinkness"
                placeholder="ضخامت"
                className="input-type col-lg-1 col-md-6 col-sm-12"
                onChange={this.handleChanges}
              />
              <input
                type="text"
                name="typeWidth"
                placeholder="عرض"
                className="input-type col-lg-1 col-md-6 col-sm-12"
                onChange={this.handleChanges}
              />
              <input
                type="text"
                name="typeBrand"
                placeholder="برند"
                className="input-type col-lg-1 col-md-6 col-sm-12"
                onChange={this.handleChanges}
              />
              <input
                type="text"
                name="typeMood"
                placeholder="حالت"
                className="input-type col-lg-1 col-md-6 col-sm-12"
                onChange={this.handleChanges}
              />
              <input
                type="text"
                name="typeDeliver"
                placeholder="تحویل"
                className="input-type col-lg-1 col-md-6 col-sm-12"
                onChange={this.handleChanges}
              />
              <input
                type="text"
                name="typeUnit"
                placeholder="واحد"
                className="input-type col-lg-1 col-md-6 col-sm-12"
                onChange={this.handleChanges}
              />
              <input
                type="text"
                name="typePrice"
                placeholder="قیمت"
                className="input-type col-lg-1 col-md-6 col-sm-12"
                onChange={this.handleChanges}
                min={0}
              />
              <button
                className="btn col col-lg-1 col-md-6 col-sm-12"
                onClick={this.sendType}
              >
                افزودن
              </button>
            </div>
          </div>
        </div>
        <button
          className={`floating-button ${this.state.floating == true &&
            `active`}`}
          onClick={this.savePrices}
        >
          ذخیره
        </button>
        <div className={`type-modal ${editableType ? "open" : ""}`}>
          <div className="header rtl">
            <i className="fal fa-pen" />
            <div>
              <span>ویرایش</span>
              <h2>{editableType.code}</h2>
            </div>
          </div>
          <ul>
            <li>
              <span>کد</span>
              <input
                type="text"
                name="updateCode"
                className="input-type"
                value={this.state[`updateCode`] || editableType.code}
                onChange={this.handleChanges}
              />
            </li>
            <li>
              <span>نام</span>
              <input
                type="text"
                name="updateName"
                className="input-type"
                value={this.state[`updateName`] || editableType.name}
                onChange={this.handleChanges}
              />
            </li>
            <li>
              <span>ضخامت</span>
              <input
                type="text"
                name="updateThinkness"
                className="input-type"
                value={this.state[`updateThinkness`] || editableType.thinkness}
                onChange={this.handleChanges}
              />
            </li>
            <li>
              <span>عرض</span>
              <input
                type="text"
                name="updateWidth"
                className="input-type"
                value={this.state[`updateWidth`] || editableType.width}
                onChange={this.handleChanges}
              />
            </li>
            <li>
              <span>برند</span>
              <input
                type="text"
                name="updateBrand"
                className="input-type"
                value={this.state[`updateBrand`] || editableType.brand}
                onChange={this.handleChanges}
              />
            </li>
            <li>
              <span>حالت</span>
              <input
                type="text"
                name="updateMood"
                className="input-type"
                value={this.state[`updateMood`] || editableType.mood}
                onChange={this.handleChanges}
              />
            </li>
            <li>
              <span>تحویل</span>
              <input
                type="text"
                name="updateDeliver"
                className="input-type"
                value={this.state[`updateDeliver`] || editableType.deliver}
                onChange={this.handleChanges}
              />
            </li>
            <li>
              <span>واحد</span>
              <input
                type="text"
                name="updateUnit"
                className="input-type"
                value={this.state[`updateUnit`] || editableType.unit}
                onChange={this.handleChanges}
              />
            </li>
            <li>
              <span>قیمت</span>
              <input
                type="text"
                name="updatePrice"
                className="input-type"
                value={this.state[`updatePrice`] || editableType.price}
                onChange={this.handleChanges}
                min={0}
              />
            </li>
            <li>
              <button className="btn edit" onClick={this.updateType}>
                ذخیره
              </button>
              <button className="btn danger" onClick={this.cancelUpdateType}>
                لغو
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Product;
