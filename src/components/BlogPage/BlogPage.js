import { Component } from "react";
import axios from "axios";

//import { posts } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard";

import "./BlogPage.css";
import { AddPostForm } from "./components/AddPostForm";
import CircularProgress from "@material-ui/core/CircularProgress";

export class BlogPage extends Component {
  state = {
    showPostForm: false,
    blogArr: [],
    isPending: false,
  };

  fetchPosts = () => {
    axios
      .get("https://640b474865d3a01f981659e2.mockapi.io/posts")
      .then((response) => {
        this.setState(() => {
          return {
            blogArr: response.data,
            isPending: false,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  likePost = (blogPost) => {
    const temp = { ...blogPost };

    temp.liked = !temp.liked;

    axios
      .put(
        `https://640b474865d3a01f981659e2.mockapi.io/posts/${blogPost.id}`,
        temp
      )
      .then((response) => {
        console.log("Пост изменен => ", response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      this.setState({
        isPending: true,
      });

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
    this.setState({
      isPending: true,
    });

    axios
      .post("https://640b474865d3a01f981659e2.mockapi.io/posts/", blogPost)
      .then((response) => {
        console.log("Пост cоздан => ", response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });

    this.handleHideAddForm();
  };

  render() {
    const blogPosts = this.state.blogArr.map((post) => {
      return (
        <BlogCard
          key={post.id}
          title={post.title}
          description={post.description}
          liked={post.liked}
          likePost={() => this.likePost(post)}
          deletePost={() => this.deletePost(post)}
        />
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Загрузка...</h1>;

    const postOpacity = this.state.isPending ? '0.5' : '1';

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
          <div className="posts" style={{ opacity: postOpacity }}>
            {blogPosts}
          </div>
          {this.state.isPending && <CircularProgress className="preloader" />}
        </main>
      </div>
    );
  }
}
