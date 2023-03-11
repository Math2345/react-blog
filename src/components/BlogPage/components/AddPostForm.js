import CancelIcon from "@material-ui/icons/Cancel";
import { Component } from "react";

import "./AddPostForm.css";

export class AddPostForm extends Component {

  state = {
    postTitle: '',
    postDescription: ''
  }


  handlePostTitleChange = e => {
    this.setState({
      postTitle: e.target.value
    })
  }

  handlePostDescriptionChange = e => {
    this.setState({
      postDescription: e.target.value
    })
  }

  createPost = e => {
    e.preventDefault();

    const post = {
      title: this.state.postTitle,
      description: this.state.postDescription,
      liked: false
    }

    this.props.addNewBlogPost(post)
  }

  handleOnEnter = (e) => {
    if (e.key === "Enter" && this.props.showPostForm) this.createPost(e);
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleOnEnter);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleOnEnter);
  }

  render() {
    const handleHideAddForm = this.props.handleHideAddForm;

    return (
      <>
        <form  className="addPostForm" onSubmit={ e => this.createPost(e)}>
          <button className="hidebtn" onClick={handleHideAddForm}>
            <CancelIcon />
          </button>
          <h2>Cоздание поста</h2>
          <div>
            <input
              className="addFormInput"
              type="text"
              name="postTitle"
              placeholder="Заголовок поста"
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
              required
            />
          </div>
          <div>
            <textarea
              className="addFormInput"
              name="postDesc"
              placeholder="Описание поста"
              value={this.state.postDescription}
              onChange={this.handlePostDescriptionChange}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="blackBtn"
            >
              Добавить пост
            </button>
          </div>
        </form>
        <div onClick={handleHideAddForm} className="overlay"></div>
      </>
    );
  }
}
