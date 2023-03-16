import CancelIcon from "@material-ui/icons/Cancel";
import { useEffect, useState } from "react";

import "./EditPostForm.css";

export const EditPostForm = (props) =>  {
  const [postTitle, setPostTitle] = useState(props.selectedPost.title);
  const [postDescription, setPostDescription] = useState(props.selectedPost.description);


  const handlePostTitleChange = e => {
    setPostTitle(e.target.value)
  }

  const handlePostDescriptionChange = e => {
    setPostDescription(e.target.value)
  }

  const savePost = e => {
    e.preventDefault();

    const post = {
      id: props.selectedPost.id,
      title: postTitle,
      description: postDescription,
      liked: props.selectedPost.liked
    }

    props.editBlogPost(post)
  }

  /*const handleOnEnter = (e) => {
    if (e.key === "Enter") this.createPost(e);
  }; */

 

  useEffect(() => {
    const handleOnEscape = (e) => {
      if (e.key === "Escape") props.handleHideEditForm();
    };

    window.addEventListener("keyup", handleOnEscape);

    return () => window.removeEventListener("keyup", handleOnEscape)
  }, [props])


  const handleHideEditForm = props.handleHideEditForm;

    return (
      <>
        <form  className="editPostForm" onSubmit={savePost}>
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
              value={postTitle}
              onChange={handlePostTitleChange}
              required
            />
          </div>
          <div>
            <textarea
              className="editFormInput"
              name="postDesc"
              placeholder="Описание поста"
              value={postDescription}
              onChange={handlePostDescriptionChange}
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
