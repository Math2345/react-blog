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

  render() {
    const handleHideAddForm = this.props.handleHideAddForm;

    return (
      <>
        <form action="#" className="addPostForm">
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
            />
          </div>
          <div>
            <textarea
              className="addFormInput"
              name="postDesc"
              placeholder="Описание поста"
              value={this.state.postDescription}
              onChange={this.handlePostDescriptionChange}
            />
          </div>
          <div>
            <button
              onClick={handleHideAddForm}
              type="button"
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
