import {signOut, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import UsernameForm from "../components/UsernameForm";
import useUserInfo from "../hooks/useUserInfo";
import PostForm from "../components/PostForm";
import axios from "axios";
import PostContent from "../components/PostContent";
import Layout from "../Layout/Layout";
import {useRouter} from "next/router";

export default function Home() {

  const {data:session} = useSession();
  const {userInfo,status:userInfoStatus} = useUserInfo();
  const [posts,setPosts] = useState([]);
  const [idsLikedByMe,setIdsLikedByMe] = useState([]);
  const router = useRouter();

  function fetchHomePosts() {
    axios.get('/api/posts').then(response => {
      setPosts(response.data.posts);
      setIdsLikedByMe(response.data.idsLikedByMe);
    });
  }



  useEffect(() => {
    fetchHomePosts();
  }, []);

  if (userInfoStatus === 'loading') {
    return 'loading user info';
  }

  if (userInfo && !userInfo?.username) {
    return <UsernameForm />;
  }

  if (!userInfo) {

    router.push('/login');
    return 'no user info';
  }

  return (
    <Layout>
      <h1 className="text-lg font-bold p-4">Home</h1>
      <PostForm onPost={() => {fetchHomePosts()}}  />
      <div className="">
        
        {posts.length > 0 && posts.map(post => (
          <div className="bg-slate-800   flex flex-col gap-2 rounded-xl mt-2 p-5 lg:p-0" key={post._id}>
            {post.parent && (
              <div className="">
                <span className=" p-2 font-bold text-gray-200">Ding</span>
                <PostContent {...post.parent} />
             
              </div>
            )}
              <span className="p-2 font-bold text-gray-200">Dong</span>
            <PostContent {...post} likedByMe={idsLikedByMe.includes(post._id)} />
          </div>
        ))}
      </div>
  
    </Layout>
  )
}
