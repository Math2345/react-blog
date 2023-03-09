import { Component } from "react";
import { posts } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard";

import "./BlogPage.css";

export class BlogPage extends Component {
  state = {
    showBlog: true,
    blogArr: JSON.parse(localStorage.getItem("blogPosts")) || posts,
  };

  likePost = (pos) => {
    const temp = this.state.blogArr;

    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blogArr: temp,
    });

    localStorage.setItem("blogPosts", JSON.stringify(temp));
  };

  toggleBlog = () => {
    this.setState((state) => {
      return {
        showBlog: !state.showBlog,
      };
    });
  };

  deletePost = (pos) => {
    if (window.confirm(`Удалить ${this.state.blogArr[pos].title}?`)) {
      const temp = [...this.state.blogArr];

      temp.splice(pos, 1);

      this.setState({
        blogArr: temp,
      });

      localStorage.setItem("blogPosts", JSON.stringify(temp));
    }
  };

  render() {
    const blogPosts = this.state.blogArr.map((post, pos) => {
      return (
        <BlogCard
          key={post.id}
          title={post.title}
          description={post.description}
          liked={post.liked}
          likePost={() => this.likePost(pos)}
          deletePost={() => this.deletePost(pos)}
        />
      );
    });

    return (
      <>
        <button onClick={this.toggleBlog}>
          {this.state.showBlog ? "Cкрыть блог" : "Показать блог"}
        </button>
        {this.state.showBlog ? (
          <main>
            <h1>Simple Blog</h1>
            <div className="posts">{blogPosts}</div>
          </main>
        ) : null}
      </>
    );
  }
}
