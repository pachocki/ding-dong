import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { AiFillBell } from "react-icons/ai";

const Login = ({ providers }) => {
  const { data, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return " ";
  }
  if (data) {
    router.push("/");
  }
  return (
    <div className="bg-gradient-primary overflow-hidden">
      <div className="flex h-screen justify-center items-center">
        <div className=" h-1/4 w-2/3 flex flex-col justify-center items-center rounded-xl lg:w-3/4 ">
          <h1 className="text-3xl  ">Hello on </h1>
          <h1 className="text-3xl flex gap-1 items-center mb-5">
            {" "}
            <AiFillBell className="animate-waving" /> Ding Dong !{" "}
          </h1>
          {Object.values(providers).map((provider) => (
            <button
              className="flex items-center gap-2 bg-gray-200 text-black rounded-full py-2 px-4 hover:opacity-80 transition-all"
              key={provider.name}
              onClick={async () => {
                await signIn(provider.id);
              }}
            >
              <FcGoogle />
              Sign in with {provider.name}{" "}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
export default Login;
