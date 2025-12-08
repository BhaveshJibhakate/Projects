import axios from "axios";
import { useState } from "react";

const CreatePost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Post submitted:", form);
    axios
      .post("http://localhost:5000/api/posts", form, { withCredentials: true })
      .then(() => {
        console.log("success");
        setForm({title:"",content:""})
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="create-container">
      <div className="create-card">
        <h2 className="create-title">Create a New Post</h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group mb-3">
            <label>Post Title</label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter title"
              required
            />
          </div>

          {/* Content */}
          <div className="form-group mb-3">
            <label>Content</label>
            <textarea
              className="form-control form-control-lg"
              rows={6}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Write your post content..."
              required
            />
          </div>

          <button className="btn btn-primary btn-lg w-100" type="submit">
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
