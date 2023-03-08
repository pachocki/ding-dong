import axios from "axios";
import React, { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineRetweet,
  AiFillHeart,
} from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import FlipNumbers from "react-flip-numbers";
import Link from "next/link";

export default function PostButtons({
  username,
  id,
  likesCount: likesCountDefault = 0,
  likedByMe: likedByMeDefault = false,
  commentsCount,
}) {
  const [likesCount, setLikesCount] = useState(likesCountDefault);
  const [likedByMe, setLikedByMe] = useState(likedByMeDefault);
  async function toggleLike() {
    const response = await axios.post("/api/like", { id });
    if (response.data?.like) {
      setLikesCount((prev) => prev + 1);
      setLikedByMe(true);
    } else {
      setLikesCount((prev) => prev - 1);
      setLikedByMe(false);
    }
  }
  return (
    <div className="flex gap-20 pt-5 lg:gap-5 ">
      <Link href={`/${username}/status/${id}`}>
        {" "}
        <div className="flex gap-2 text-sm items-center  cursor-pointer">
          <BsChat className="hover:fill-purple-500   " />
          <span>{commentsCount}</span>
        </div>
      </Link>
      <div className="flex gap-2 text-sm items-center cursor-pointer">
        <AiOutlineRetweet />
        <span>0</span>
      </div>
      <div
        className="flex gap-2 text-sm items-center cursor-pointer hover:opacity-80 fill-red-500"
        onClick={toggleLike}
      >
        {likedByMe || likesCount > 0 ? (
          <AiFillHeart className="fill-red-500" />
        ) : (
          <AiOutlineHeart className="hover:fill-red-500  cursor-pointer " />
        )}
        <FlipNumbers
          height={12}
          width={12}
          play
          perspective={100}
          numbers={likesCount.toString()}
        />
      </div>
      <div className="flex gap-2 text-sm items-center cursor-pointer">
        {" "}
        <AiOutlineShareAlt className="hover:fill-sky-500  cursor-pointer" />
     
      </div>
    </div>
  );
}
