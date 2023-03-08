import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import React, { useState } from "react";
import Avatar from "./Avatar";
import { AiFillBell } from "react-icons/ai";

const PostForm = ({ onPost, compact,parent }) => {
  const { userInfo, status } = useUserInfo();
  const [text, setText] = useState("");
  const [effect, setEffect] = useState(false);
  if (status === "loading") {
  }
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const json = await axios.post("/api/posts", { text , parent });
    setText("");
    if (onPost) {
      onPost();
    }
  };
  return (
    <div>
      <form className="h-full py-5 " onSubmit={handlePostSubmit}>
        <div
          className={
            (compact ? "grid grid-cols-[50px_auto] grid-row-2  mt-3 gap-y-0 " : " ") +
            "flex gap-2"
          }
        >
          <Avatar src={userInfo?.image} />
          <div className="grow overflow-hidden">
            <textarea
              className="w-full h-[15vh] bg-slate-800/60 p-2 text-xl rounded-xl overflow-hidden outline-0"
              placeholder= {(compact ? "Please replay here ." : "What's happening?")}
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <div className=" pt-2 flex justify-end">
              {!compact && (
                <button
                  className={`${
                    effect && "animate-wiggle"
                  } bg-gradient-secondary text-lg px-5 text-white   py-1 rounded-xl mt-2  flex items-center gap-1 lg:px-3 lg:text-sm `}
                  onClick={() => {
                    setEffect(true);
                  }}
                  onAnimationEnd={() => setEffect(false)}
                >
                  <AiFillBell /> Ding
                </button>
              )}
            </div>
          </div>
          {compact && (
            <div className="flex justify-end col-start-2 items-center ">
              <button
                className={`${
                  effect && "animate-wiggle"
                } bg-gradient-secondary text-lg px-5 text-white   py-1 rounded-xl mt-2  flex items-center gap-1`}
                onClick={() => {
                  setEffect(true);
                }}
                onAnimationEnd={() => setEffect(false)}
              >
                <AiFillBell /> Dong
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostForm;
