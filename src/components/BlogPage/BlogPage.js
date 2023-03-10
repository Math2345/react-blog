import { Component } from "react";
import axios from "axios";

//import { posts } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard";

import "./BlogPage.css";
import { AddPostForm } from "./components/AddPostForm";

export class BlogPage extends Component {
  state = {
    showPostForm: false,
    blogArr: [],
    isPending: false
  };

  fetchPosts = () => {
    this.setState({
      isPending: true
    })

    axios
      .get("https://640b474865d3a01f981659e2.mockapi.io/posts")
      .then((response) => {
        this.setState(() => {
          return {
            blogArr: response.data,
            isPending: false
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  likePost = (pos) => {
    this.setState((state) => {
      const temp = state.blogArr;

      temp[pos].liked = !temp[pos].liked;

      localStorage.setItem("blogPosts", JSON.stringify(temp));

      return {
        blogArr: temp,
      };
    });
  };

  deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      axios
        .delete(
          `https://640b474865d3a01f981659e2.mockapi.io/posts/${blogPost.id}`
        )
        .then((response) => {
          console.log("Пост удален => ", response.data);
          this.fetchPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleShowAddForm = () => {
    this.setState({
      showPostForm: true,
    });
  };

  handleHideAddForm = () => {
    this.setState({
      showPostForm: false,
    });
  };

  handleOnEscape = (e) => {
    if (e.key === "Escape" && this.state.showPostForm) this.handleHideAddForm();
  };

  componentDidMount() {
    this.fetchPosts();
    window.addEventListener("keyup", this.handleOnEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleOnEscape);
  }

  addNewBlogPost = (blogPost) => {
    const temp = [...this.state.blogArr];
    temp.push(blogPost);

    this.setState((state) => {
      const temp = [...state.blogArr];
      temp.push(blogPost);

      localStorage.setItem("blogPosts", JSON.stringify(temp));

      return {
        blogArr: temp,
      };
    });

    this.handleHideAddForm();
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
          deletePost={() => this.deletePost(post)}
        />
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Загрузка...</h1>;

    return (
      <div className="blogPage">
        {this.state.showPostForm ? (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleHideAddForm={this.handleHideAddForm}
            showPostForm={this.state.showPostForm}
          />
        ) : null}

        <main>
          <h1>Блог</h1>
          <div className="addNewPost">
            <button className="blackBtn" onClick={this.handleShowAddForm}>
              Создать новый пост
            </button>
          </div>
          {
            this.state.isPending && <h2>Подождите...</h2>
          }
          <div className="posts">{blogPosts}</div>
        </main>
      </div>
    );
  }
}
