import React, { Component } from "react";
import * as api from "../../../src/api";

export class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "تست سربرگ",
      body: "تست بدنه",
      image: "",
      posts: [],
      editable: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendPost = this.sendPost.bind(this);
    this.startUpdate = this.startUpdate.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleBodyChanges = this.handleBodyChanges.bind(this);
  }
  async componentDidMount() {
    const editor = document.querySelector("#editor p");
    editor.classList = [...editor.classList, "ql-align-right ql-direction-rtl"];
    const posts = await api.getPosts();
    this.setState({ posts });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleBodyChanges(body) {
    this.setState({ body });
  }
  handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      this.setState({
        [e.target.name]: e.target.files[0]
      });
      var reader = new FileReader();
      reader.onload = e => {
        this.setState({
          selectedImage: e.target.result
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  async sendPost() {
    const { title, body, image, posts } = this.state;
    if (!title || !body || !image) {
      return alert("لطفا ورودی های خودتون رو چک کنید");
    }
    const post = await api.sendPost({ title, body, image });
    if (post == "failed") {
      return alert("لطفا ورودی های خودتون رو چک کنید");
    }
    this.setState({ posts: [post, ...posts] });
    return alert("پست اضافه شد");
  }
  startUpdate(id) {
    const { posts } = this.state;
    const post = posts.find(item => item.id == id);
    this.setState({
      title: post.title,
      body: post.body,
      image: post.image,
      editable: id
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
  cancelUpdate() {
    this.setState({ editable: false, image: "", title: "", body: "" });
  }
  async updatePost() {
    const { title, image, body, editable, posts } = this.state;
    if (!title || !image || !body)
      return alert("لطفا ورودی های خودتون رو چک کنید");
    const result = await api.updatePost({ title, body, image, id: editable });
    if (result == "failed") {
      return alert("متاسفانه ویرایش ناموفق بود");
    }
    const updatedPosts = posts.map((item, index) => {
      if (item.id == editable) {
        item.title = title;
        item.body = body;
        item.image = image;
      }
      return item;
    });
    this.setState({
      title: "",
      body: "",
      image: "",
      posts: updatedPosts,
      editable: false
    });
    return alert("ویرایش با موفقیت انجام شد");
  }
  async deletePost(id) {
    const result = await api.deletePost({ id });
    if (result) {
      this.setState({ posts: this.state.posts.filter(item => item.id != id) });
    }
  }
  render() {
    const { title, body, image, posts, editable, selectedImage } = this.state;
    const ReactQuill = require("react-quill");

    return (
      <div className="dashboard-container rtl">
        <div className="dashboard-actions">
          <h1>{editable ? "ویرایش مقاله" : "افزودن مقاله جدید"}</h1>
          <p>تصویر</p>
          <label
            className="image-selector"
            htmlFor={`post-image`}
            style={{
              backgroundImage: selectedImage
                ? `url(${selectedImage})`
                : editable
                ? `url(${require(`../../../public/uploads/images/${image}`)}`
                : "transparent"
            }}
          > 
            +
          </label>
          <input
            type="file"
            name="image"
            id="post-image"
            onChange={this.handleImageChange.bind(this)}
          />
          <p>سربرگ</p>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <p>متن</p>
          <div id="editor">
            <ReactQuill
              value={body}
              className="panel-editor rtl text-center text-dark"
              theme="snow"
              modules={this.modules()}
              formats={this.formats()}
              style={{ direction: "rtl" }}
              onChange={this.handleBodyChanges.bind(this)}
            />
          </div>
          <br />
          <div style={{ display: editable ? "none" : "block" }}>
            <button onClick={this.sendPost} className="primary">ارسال</button>
          </div>
          <div style={{ display: editable ? "flex" : "none" }}>
            <button onClick={this.updatePost} className="edit">ذخیره</button>
            <button onClick={this.cancelUpdate} className="danger">لغو</button>
          </div>
        </div>
        <hr />
        <h2>مقالات</h2>
        <div className="posts-list" style={{ textAlign: "left" }}>
          <div className="posts-list-header">
            <span width="60%">سربرگ</span>
            <span width="40%">عملیات</span>
          </div>
          <div className="posts-list-data">
            {posts.map((item, index) => {
              return (
                <div key={index}>
                  <span>{item.title}</span>
                  <div>
                    <button
                      className="danger"
                      onClick={() => this.deletePost(item.id)}
                    >
                      حذف
                    </button>
                    <button
                      className="edit"
                      onClick={() => this.startUpdate(item.id)}
                    >
                      ویرایش
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
