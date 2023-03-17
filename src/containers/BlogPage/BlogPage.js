import { useEffect, useState } from "react";
import axios from "axios";
import { BlogCard } from "./components/BlogCard";

import "./BlogPage.css";
import { AddPostForm } from "./components/AddPostForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import { EditPostForm } from "./components/EditPostForm";
import { postsUrl } from "../../shared/projectData";

export const BlogPage = ({ isAdmin }) => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [blogArr, setBlogArr] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const fetchPosts = () => {
    axios
      .get(postsUrl)
      .then((response) => {
        setBlogArr([...response.data]);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likePost = (blogPost) => {
    const temp = { ...blogPost };

    temp.liked = !temp.liked;

    axios
      .put(`${postsUrl}${blogPost.id}`, temp)
      .then((response) => {
        console.log("Пост изменен => ", response.data);
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      setIsPending(true);

      axios
        .delete(`${postsUrl}${blogPost.id}`)
        .then((response) => {
          console.log("Пост удален => ", response.data);
          fetchPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleShowAddForm = () => {
    setShowPostForm(true);
  };

  const handleHideAddForm = () => {
    setShowPostForm(false);
  };

  const handleShowEditForm = () => {
    setShowEditForm(true);
  };

  const handleHideEditForm = () => {
    setShowEditForm(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addNewBlogPost = (blogPost) => {
    setIsPending(true);

    axios
      .post(postsUrl, blogPost)
      .then((response) => {
        console.log("Пост cоздан => ", response.data);
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });

    handleHideAddForm();
  };

  const handleSelectedPost = (blogPost) => {
    setSelectedPost({ ...blogPost });
  };

  const editBlogPost = (updatedBlogPost) => {
    setIsPending(true);

    axios
      .put(`${postsUrl}${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
        console.log("Пост отредактирован => ", response.data);
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });

    handleHideEditForm();
  };


  console.log(isAdmin)

  const blogPosts = blogArr.map((post) => {
    return (
      <BlogCard
        key={post.id}
        title={post.title}
        description={post.description}
        liked={post.liked}
        likePost={() => likePost(post)}
        deletePost={() => deletePost(post)}
        handleShowEditForm={handleShowEditForm}
        handleSelectedPost={() => handleSelectedPost(post)}
        isAdmin={isAdmin}
      />
    );
  });

  if (blogArr.length === 0) return <h1>Загрузка...</h1>;

  const postOpacity = isPending ? "0.5" : "1";

  return (
    <div className="blogPage">
      {showPostForm && (
        <AddPostForm
          blogArr={blogArr}
          addNewBlogPost={addNewBlogPost}
          handleHideAddForm={handleHideAddForm}
          showPostForm={showPostForm}
        />
      )}

      {showEditForm && (
        <EditPostForm
          handleHideEditForm={handleHideEditForm}
          selectedPost={selectedPost}
          editBlogPost={editBlogPost}
        />
      )}

      <main>
        <h1>Блог</h1>
        {isAdmin && (
          <div className="addNewPost">
            <button className="blackBtn" onClick={handleShowAddForm}>
              Создать новый пост
            </button>
          </div>
        )}
        <div className="posts" style={{ opacity: postOpacity }}>
          {blogPosts}
        </div>
        {isPending && <CircularProgress className="preloader" />}
      </main>
    </div>
  );
};
