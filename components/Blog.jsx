import React, { Component } from "react";
export class Blog extends Component {
  render() {
    const { posts } = this.props;
    return (
      <section className="blog rtl">
        <div className="first-post box-container">
          <div className="box-title">
            <i className="fas fa-scroll"></i>
            <span>آخرین پست</span>
          </div>
          <div className="post-content">
            <img
              src={require(`../public/uploads/images/${posts[0].image}`)}
              alt={posts[0].title}
            />
            <div>
              <h1>{posts[0].title}</h1>
              <div dangerouslySetInnerHTML={{ __html: posts[0].body.slice(0,150) + "..." }} />
            </div>
          </div>
        </div>
        <div className="latest-posts box-container">
          <div className="box-title">
            <i className="fas fa-clone"></i>
            <span>پست های اخیر</span>
          </div>
          <ul>
            {posts.map((item, index) => {
              return (
                <li key={index}>
                  <div>
                    {/* <img src={`/uploads/images/${item.image}`} /> */}
                    <img
                      src={require(`../public/uploads/images/${item.image}`)}
                      alt={item.title}
                    />
                    <h3>{item.title}</h3>
                  </div>
                  <div>
                    <span>مشاهده</span>
                    <i className="fas fa-arrow-left" />
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

export default Blog;
