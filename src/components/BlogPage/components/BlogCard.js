import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

import "./BlogCard.css";

export const BlogCard = ({
  title,
  description,
  liked,
  likePost,
  deletePost,
  handleShowEditForm,
  handleSelectedPost
}) => {

  const showEditForm = () => {
    handleSelectedPost()
    handleShowEditForm()
  }

  const heartFill = liked ? "crimson" : "black";

  return (
    <div className="post">
      <div className="postContent">
        <h2>{title}</h2>
        <p>{description}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      <div className="postControl">
        <button className="editBtn" onClick={showEditForm}>
          <EditIcon />
        </button>
        <button>
          <DeleteForeverIcon className="deleteBtn" onClick={deletePost} />
        </button>
      </div>
    </div>
  );
};
