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
      product: { Types: [] }
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.sendProduct = this.sendProduct.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.handlePriceChanges = this.handlePriceChanges.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDescriptionChanges = this.handleDescriptionChanges.bind(this);
    this.savePrices = this.savePrices.bind(this);
    this.sendType = this.sendType.bind(this);
  }
  async componentDidMount() {
    const editor = document.querySelector("#editor p");
    editor.classList = [...editor.classList, "ql-align-right ql-direction-rtl"];
    const products = await api.getProducts();
    this.setState({ products, product: products[0] });
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

  render() {
    const { products, product, selectedImage } = this.state;
    const ReactQuill = require("react-quill");

    return (
      <div className="dashboard-container rtl">
        <div className="dashboard-actions">
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
          {/* <textarea
            type="text"
            name="productDescription"
            value={this.state.productDescription || ""}
            onChange={this.handleChanges}
          ></textarea> */}
          <br />
          <button onClick={this.sendProduct}>SEND</button>
        </div>
        <hr />
        <div className="products-list">
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
            {product.Types.length != 0 && (
              <div className="type-header">
                <span>کد</span>
                <span>نام</span>
                <span>ضخامت</span>
                <span>عرض</span>
                <span>برند</span>
                <span>حالت</span>
                <span>تحویل</span>
                <span>واحد</span>
                <span>قیمت</span>
              </div>
            )}
            {product.Types.map((item, index) => {
              return (
                <div key={item.id} className="type-item">
                  <span>{item.code}</span>
                  <span>{item.name}</span>
                  <span>{item.thinkness}</span>
                  <span>{item.width}</span>
                  <span>{item.brand}</span>
                  <span>{item.mood}</span>
                  <span>{item.deliver}</span>
                  <span>{item.unit}</span>
                  <input
                    type="number"
                    name={`item-${item.id}`}
                    onChange={this.handlePriceChanges}
                    value={
                      this.state[`item-${item.id}`] ||
                      item.price.toLocaleString()
                    }
                  />
                </div>
              );
            })}
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
                type="number"
                name="typeThinkness"
                placeholder="ضخامت"
                className="input-type col-lg-1 col-md-6 col-sm-12"
                onChange={this.handleChanges}
              />
              <input
                type="number"
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
                type="number"
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
      </div>
    );
  }
}
export default Product;
