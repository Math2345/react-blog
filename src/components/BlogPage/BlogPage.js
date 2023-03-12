import { Component } from "react";
import axios from "axios";

//import { posts } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard";

import "./BlogPage.css";
import { AddPostForm } from "./components/AddPostForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import { EditPostForm } from "./components/EditPostForm";

export class BlogPage extends Component {
  state = {
    showPostForm: false,
    showEditForm: false,
    blogArr: [],
    isPending: false,
    selectedPost: {}
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

  handleShowEditForm = () => {
    this.setState({
      showEditForm: true,
    });
  };

  handleHideEditForm = () => {
    this.setState({
      showEditForm: false,
    });
  };

  componentDidMount() {
    this.fetchPosts();
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

  handleSelectedPost = (blogPost) => {

    this.setState({
      selectedPost: blogPost
    })
  }

  editBlogPost = (updatedBlogPost) => {

    console.log(updatedBlogPost)

    this.setState({
      isPending: true,
    });

    axios
      .put(`https://640b474865d3a01f981659e2.mockapi.io/posts/${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
        console.log("Пост отредактирован => ", response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });

    this.handleHideEditForm();
  }

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
          handleShowEditForm={this.handleShowEditForm}
          handleSelectedPost={() => this.handleSelectedPost(post)}
        />
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Загрузка...</h1>;

    const postOpacity = this.state.isPending ? "0.5" : "1";

    return (
      <div className="blogPage">
        {this.state.showPostForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleHideAddForm={this.handleHideAddForm}
            showPostForm={this.state.showPostForm}
          />
        )}

        {this.state.showEditForm && (
          <EditPostForm   
            handleHideEditForm={this.handleHideEditForm}
            selectedPost={this.state.selectedPost} 
            editBlogPost={this.editBlogPost}
          />
        )}

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
