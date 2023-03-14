import CancelIcon from "@material-ui/icons/Cancel";
import { useState, useEffect } from "react";

import "./AddPostForm.css";

export const AddPostForm = (props) => {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handlePostDescriptionChange = (e) => {
    setPostDescription(e.target.value);
  };

  const createPost = (e) => {
    e.preventDefault();

    const post = {
      title: postTitle,
      description: postDescription,
      liked: false,
    };

    props.addNewBlogPost(post);
  };

  /*handleOnEnter = (e) => {
    if (e.key === "Enter") this.createPost(e);
  }; */

  useEffect(() => {
    const handleOnEscape = (e) => {
      if (e.key === "Escape") props.handleHideEditForm();
    };

    window.addEventListener("keyup", handleOnEscape);

    return () => window.removeEventListener("keyup", handleOnEscape);
  }, [props]);

  const handleHideAddForm = props.handleHideAddForm;

  return (
    <>
      <form className="addPostForm" onSubmit={(e) => createPost(e)}>
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
            value={postTitle}
            onChange={handlePostTitleChange}
            required
          />
        </div>
        <div>
          <textarea
            className="addFormInput"
            name="postDesc"
            placeholder="Описание поста"
            value={postDescription}
            onChange={handlePostDescriptionChange}
            rows={8}
            required
          />
        </div>
        <div>
          <button type="submit" className="blackBtn">
            Добавить пост
          </button>
        </div>
      </form>
      <div onClick={handleHideAddForm} className="overlay"></div>
    </>
  );
};
