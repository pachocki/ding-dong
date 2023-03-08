import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import axios from "axios";
import HeroUser from "../components/HeroUser";
import Avatar from "../components/Avatar";
import PostContent from "../components/PostContent";
import useUserInfo from "../hooks/useUserInfo";
import Layout from "@/Layout/Layout";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserPage() {
  const {data:session} = useSession();
  const router = useRouter();
  const { username } = router.query;
  const [profileInfo, setProfileInfo] = useState();
  const [originalUserInfo, setOriginalUserInfo] = useState();
  const { userInfo } = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [postsLikedByMe, setPostsLikedByMe] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {

    axios.get("/api/users?username=" + username).then((response) => {
      setProfileInfo(response.data.user);
      setOriginalUserInfo(response.data.user);
      setIsFollowing(!!response.data.follow);
    });
  }, [username]);

  useEffect(() => {
    if (!profileInfo?._id) {
      return;
    }
    axios.get("/api/posts?author=" + profileInfo._id).then((response) => {
      setPosts(response.data.posts);
      setPostsLikedByMe(response.data.idsLikedByMe);
    });
  }, [profileInfo]);

  function updateUserImage(type, src) {
    setProfileInfo((prev) => ({ ...prev, [type]: src }));
  }

  async function updateProfile() {
    const { bio, name, username } = profileInfo;
    await axios.put("/api/profile", {
      bio,
      name,
      username,
    });
    setEditMode(false);
  }

  function cancel() {
    setProfileInfo((prev) => {
      const { bio, name, username } = originalUserInfo;
      return { ...prev, bio, name, username };
    });
    setEditMode(false);
  }

  function toggleFollow() {
    setIsFollowing((prev) => !prev);
    axios.post("/api/followers", {
      destination: profileInfo?._id,
    });
  }

  const isMyProfile = profileInfo?._id === userInfo?._id;

  
console.log(profileInfo);

  return (
    <Layout>
      {!!profileInfo && (
        <div>
          <HeroUser
            src={profileInfo?.cover}
            editable={isMyProfile}
            onChange={(src) => updateUserImage("cover", src)}
          />
          <div className="flex justify-between">
            <div className="ml-5 relative">
              <div className="absolute -top-12 border-2 rounded-full border-black overflow-hidden">
              <Link href={"/" + posts.author?.username}>  <Avatar
                  big
                  src={profileInfo.image}
                  editable={isMyProfile}
                  onChange={(src) => updateUserImage("image", src)}
              
                /></Link>
              </div>
            </div>
            <div className="p-2">
              {!isMyProfile && (
                <button
                  onClick={toggleFollow}
                  className={
                    (isFollowing
                      ? "bg-gradient-secondary "
                      : "bg-gradient-secondary text-white") +
                    " py-2 px-5 rounded-full"
                  }
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
              {isMyProfile && (
                <div>
                  {!editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-gradient-secondary  py-2 px-5 rounded-full lg:text-sm lg:px-3 lg:py-1"
                    >
                      Edit profile
                    </button>
                  )}
                  {editMode && (
                    <div>
                      <button
                        onClick={() => cancel()}
                        className="bg-gradient-secondary  py-2 px-5 rounded-full mr-2 lg:text-sm lg:px-3 lg:py-1"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => updateProfile()}
                        className="bg-gradient-secondary  py-2 px-5 rounded-full lg:text-sm lg:px-3 lg:py-1"
                      >
                        Save profile
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="px-5 mt-2">
            {!editMode && (
              <h1 className="font-bold text-xl leading-5">
                {profileInfo.name}
              </h1>
            )}
            {editMode && (
              <div>
                <input
                  type="text"
                  value={profileInfo.name}
                  onChange={(ev) =>
                    setProfileInfo((prev) => ({
                      ...prev,
                      name: ev.target.value,
                    }))
                  }
                  className="bg-slate-800 p-2 mb-2 rounded-full  outline-none"
                />
              </div>
            )}
            {!editMode && (
              <h2 className=" text-sm ">@{profileInfo.username}</h2>
            )}
            {editMode && (
              <div>
                <input
                  type="text"
                  value={profileInfo.username}
                  onChange={(ev) =>
                    setProfileInfo((prev) => ({
                      ...prev,
                      username: ev.target.value,
                    }))
                  }
                  className="bg-slate-800 p-2 mb-2 rounded-full  outline-none"
                />
              </div>
            )}
            {!editMode && (
              <div className="text-sm mt-2 mb-2">{profileInfo.bio}</div>
            )}
            {editMode && (
              <div className="overflow-hidden">
                <textarea
                  value={profileInfo.bio}
                  onChange={(ev) =>
                    setProfileInfo((prev) => ({
                      ...prev,
                      bio: ev.target.value,
                    }))
                  }
                  className=" bg-slate-800 p-2 mb-2 rounded-2xl  block  outline-none  w-3/4  lg:w-full"
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div>
        <h2 className="text-xl pt-10 font-bold">All your posts :</h2>
      </div>
      {posts?.length > 0 &&
        posts.map((post) => (
          <div className=" bg bg-slate-800 mt-2 rounded-xl p-5" key={post._id}>
            <PostContent
              {...post}
              likedByMe={postsLikedByMe.includes(post._id)}
            />
          </div>
        ))}
    </Layout>
  );
}
