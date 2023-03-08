import useUserInfo from "../hooks/useUserInfo";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillBell } from "react-icons/ai";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Navbar = () => {
  const router = useRouter();
  const [colorChange, setColorchange] = useState(false);
  const [effect, setEffect] = useState(false);
  const { userInfo, setUserInfo } = useUserInfo();
console.log(userInfo)
  useEffect(() => {
    const changeNavbarColor = () => {
      if (window.scrollY >= 150) {
        setColorchange(true);
      } else {
        setColorchange(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", changeNavbarColor);
    }

    // cleanup function to remove the event listener
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", changeNavbarColor);
      }
    };
  }, []);

  async function logout() {
    await signOut({ redirect: false });
    Cookies.remove("user");
    router.replace("/login");
  }
  return (
    <div
      className={
        colorChange ? "navbar colorchange px-5 lg:px-2" : "navbar px-5 lg:px-2"
      }
    >
      <div className="big-screen:text-3xl font-bold text-center screen:text-2xl">
        <Link href="/">
          {" "}
          <h1
            className={`${
              effect && "animate-wiggle"
            } flex items-center gap-1 lg:text-lg`}
            onClick={() => {
              setEffect(true);
            }}
            onAnimationEnd={() => setEffect(false)}
          >
            <AiFillBell />
            Ding Dong
          </h1>
        </Link>
      </div>
      <nav>
        <ul className="flex p-6 text-xl gap-5 items-center ">
          <li><Link href={`/${userInfo?.username}`}>Profil</Link></li>
          <li>
            <button
              className="bg-gradient-secondary px-3 py-2 rounded-xl lg:text-sm lg:px-2 lg:py-1"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
