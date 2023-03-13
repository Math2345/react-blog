import CancelIcon from "@material-ui/icons/Cancel";
import { Component } from "react";

import "./EditPostForm.css";

export class EditPostForm extends Component {

  state = {
    postTitle: this.props.selectedPost.title, 
    postDescription: this.props.selectedPost.description,
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

  savePost = e => {
    e.preventDefault();

    const post = {
      id: this.props.selectedPost.id,
      title: this.state.postTitle,
      description: this.state.postDescription,
      liked: this.props.selectedPost.liked
    }

    this.props.editBlogPost(post)
  }

  handleOnEnter = (e) => {
    if (e.key === "Enter") this.createPost(e);
  };

  handleOnEscape = (e) => {
    if (e.key === "Escape") this.props.handleHideEditForm();
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleOnEscape);
    window.addEventListener("keyup", this.handleOnEnter);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleOnEscape);
    window.removeEventListener("keyup", this.handleOnEnter);
  }


  render() {
    const handleHideEditForm = this.props.handleHideEditForm;

    return (
      <>
        <form  className="editPostForm" onSubmit={this.savePost}>
          <button className="hidebtn" onClick={handleHideEditForm}>
            <CancelIcon />
          </button>
          <h2>Редактирование поста</h2>
          <div>
            <input
              className="editFormInput"
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
              className="editFormInput"
              name="postDesc"
              placeholder="Описание поста"
              value={this.state.postDescription}
              onChange={this.handlePostDescriptionChange}
              rows={8}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="blackBtn"
            >
              Редактировать пост
            </button>
          </div>
        </form>
        <div onClick={handleHideEditForm} className="overlay"></div>
      </>
    );
  }
}
