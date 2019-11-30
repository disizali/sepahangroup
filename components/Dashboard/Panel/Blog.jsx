import React, { Component } from "react";
import * as api from "../../../src/api";

export class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "test title", body: "test body", image: "", posts: [], editable: false };
    this.handleChange = this.handleChange.bind(this);
    this.sendPost = this.sendPost.bind(this);
    this.startUpdate = this.startUpdate.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  async componentDidMount() {
    const posts = await api.getPosts();
    this.setState({ posts });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleImageChange(e) {
    this.setState({ [e.target.name]: e.target.files[0] });
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
      // image: post.image,
      editable: id
    });
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
    const { title, body, image, posts, editable } = this.state;
    return (
      <div>
        <h1>Blog Tab</h1>
        <br />
        <h2>{editable ? "Edit" : "Add"} Post :</h2>
        <p>Image : </p>
        <input type="file" name="image" onChange={this.handleImageChange} />
        <p>Title : </p>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <p>Body : </p>
        <textarea
          type="text"
          name="body"
          value={body}
          onChange={this.handleChange}
        ></textarea>
        <br />
        <div style={{ display: editable ? "none" : "block" }}>
          <button onClick={this.sendPost}>SEND</button>
        </div>
        <div style={{ display: editable ? "flex" : "none" }}>
          <button onClick={this.updatePost}>SAVE</button>
          <button onClick={this.cancelUpdate}>CANCEL</button>
        </div>
        <hr />
        <h2> Blog Posts :</h2>
        <table style={{ textAlign: "left" }}>
          <thead>
            <tr>
              <th width="40%">title</th>
              <th width="40%">body</th>
              <th width="20%">actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                  <td>
                    <button onClick={() => this.deletePost(item.id)}>X</button>
                    <button onClick={() => this.startUpdate(item.id)}>
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Blog;
