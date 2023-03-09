import CancelIcon from "@material-ui/icons/Cancel";

import "./AddPostForm.css";

export const AddPostForm = ({ handleHideAddForm }) => {
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
          />
        </div>
        <div>
          <textarea
            className="addFormInput"
            name="postDesc"
            placeholder="Описание поста"
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
      <div onClick={handleHideAddForm} className ="overlay"></div>
    </>
  );
};
