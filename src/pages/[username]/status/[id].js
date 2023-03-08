import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";

import Layout from "@/Layout/Layout";
import PostContent from "@/components/PostContent";
import PostForm from "@/components/PostForm";
import useUserInfo from "@/hooks/useUserInfo";

const PostPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { userInfo } = useUserInfo();

  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [repliesLikedByMe, setRepliesLikedByMe] = useState([]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/api/posts?id=${id}`);
      setPost(data.post);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReplies = async () => {
    try {
      const { data } = await axios.get(`/api/posts?parent=${id}`);
      setReplies(data.posts);
      setRepliesLikedByMe(data.idsLikedByMe);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchReplies();
    }
  }, [id]);

  const handlePost = () => {
    fetchReplies();
  };

 

  return (
    <Layout>
      {post && (
        <div className="px-5 py-2 bg-slate-800/60 rounded-xl">
          <PostContent {...post} big />
        </div>
      )}

      {userInfo && (
        <div className="py-5">
          <PostForm
            parent={id}
            compact
            placeholder="Tweet your reply"
            onPost={handlePost}
          />
        </div>
      )}

      {replies.length > 0 && (
        <div className="">
          <h2 className="text-xl">All Replies:</h2>
          {replies.map((reply) => (
            <div
              className="p-5 bg-slate-800/60 rounded-xl mt-2"
              key={reply._id}
            >
              <PostContent
                {...reply}
                likedByMe={repliesLikedByMe.includes(reply._id)}
              />
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default PostPage;