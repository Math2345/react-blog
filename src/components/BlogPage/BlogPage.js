import { Component } from "react";
import { posts } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard";

import "./BlogPage.css";
import { AddPostForm } from "./components/AddPostForm";

export class BlogPage extends Component {
  state = {
    showPostForm: false,
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

  handleShowAddForm = () => {
    this.setState({
      showPostForm: true
    })
  }

  handleHideAddForm = () => {
    this.setState({
      showPostForm: false
    })
  }

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
        {this.state.showPostForm ? <AddPostForm handleHideAddForm={this.handleHideAddForm}/> : null}

        <main>
          <h1>Simple Blog</h1>
          <button className="blackBtn" onClick={this.handleShowAddForm}>Создать новый пост</button>
          <div className="posts">{blogPosts}</div>
        </main>
      </>
    );
  }
}
