import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../App";

export default function PostList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [commentText, setCommentText] = useState("");
  const [postComments, setPostComments] = useState<any[]>([]);

  const fetchPosts = async () => {
    const { data } = await axios.get(`${URL}/api/posts`, {
      withCredentials: true,
    });
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Add comment
  const addComment = async () => {
    if (!commentText.trim() || !selectedPost) return;

    const { data } = await axios.post(
      `${URL}/api/comments/${selectedPost._id}`,
      { text: commentText },
      { withCredentials: true }
    );

    setSelectedPost({ ...selectedPost, comments: data.comments });
    fetchCommentsforPost(selectedPost)
    setCommentText("");
  };

  const fetchCommentsforPost = (post:any) => {
    axios
      .get(`${URL}/api/comments/${post._id}`, {
        withCredentials: true,
      })
      .then((res) => setPostComments(res.data))
      .catch((err) => console.log(err));
  };

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
     fetchCommentsforPost(post) 
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
      {/* LEFT SIDE - POST LIST */}
      <div className="w-96 bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">All Posts</h2>

        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post._id}
              onClick={() => handlePostClick(post)}
              className={`p-4 border rounded-lg cursor-pointer transition-all
              ${
                selectedPost?._id === post._id
                  ? "bg-blue-100 border-blue-400"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <h4 className="font-semibold text-lg">{post.title}</h4>

              <p className="text-sm text-blue-700 font-medium">
                Blog By: {post.author?.name || "Unknown"}
              </p>

              <p className="text-gray-600 text-sm">
                {post?.content?.slice(0, 70)}...
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - POST DETAILS */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
        {selectedPost ? (
          <>
            <h2 className="text-2xl font-bold mb-2">{selectedPost.title}</h2>

            <p className="text-blue-700 font-medium mb-3">
              Author: {selectedPost.author?.name || "Unknown"}
            </p>

            <p className="text-gray-700 mb-6">{selectedPost.content}</p>

            <h3 className="text-xl font-semibold mb-3">Comments</h3>

            {/* UPDATED COMMENT UI */}
            {postComments?.length > 0 ? (
              <div className="space-y-3 mb-6">
                {postComments.map((c: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg shadow-sm border"
                  >
                    {/* Avatar */}
                    <div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-semibold">
                      {c.user.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Comment */}
                    <div>
                      <p className="font-medium text-gray-900">{c.user.name}</p>
                      <p className="text-gray-700">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-4">No comments yet.</p>
            )}

            {/* ADD COMMENT */}
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <button
                onClick={addComment}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Post
              </button>
            </div>
          </>
        ) : (
          <h3 className="text-gray-500 text-xl">Select a post</h3>
        )}
      </div>
    </div>
  );
}
