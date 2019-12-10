import React, { Component } from "react";
import Link from "next/link";

export class Blog extends Component {
  getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }
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
              <div
                dangerouslySetInnerHTML={{
                  __html: posts[0].body.substring(
                    0,
                    this.getPosition(posts[0].body, "</p>", 2) + 4
                  )
                }}
              />
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
                    <img
                      src={`/uploads/images/${encodeURI(item.image)}`}
                      alt={item.title}
                    />
                    {/* <img */}
                    {/* src={require(`../public/uploads/images/${item.image}`)} */}
                    {/* alt={item.title} */}
                    {/* /> */}
                    <h3>{item.title}</h3>
                  </div>
                  <Link href={`/posts/${encodeURI(item.title)}`}>
                    <a>
                      <div>
                        <span>مشاهده</span>
                        <i className="fas fa-sort-down" />
                      </div>
                    </a>
                  </Link>
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
