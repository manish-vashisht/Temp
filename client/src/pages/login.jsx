import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { useEffect } from "react";

const login = () => {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  useEffect(() => {
    if (userInfo?.id && !newUser) router.push("/");
  }, [newUser, userInfo]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);
    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        if (!data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              status: "",
            },
          });
          router.push("/onboarding");
        } else {
          const {
            id,
            name,
            email,
            profilePicture: profileImage,
            status,
          } = data.data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profileImage,
              status,
            },
          });
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center bg-panel-header-background h-screen w-screen flex-col gap-3 p-4 md:p-0">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-white">
        <Image
          src="/whatsapp.gif"
          alt="Whatsapp"
          height={300}
          width={300}
          priority
        />
        <span className="text-3xl sm:text-7xl">Whatsapp</span>
      </div>
      <button
        className="flex items-center justify-center gap-2 md:gap-7 bg-search-input-container-background p-3 md:p-5 rounded-lg mt-6"
        onClick={handleLogin}
      >
        <FcGoogle className="text-2xl md:text-4xl" />
        <span className="text-white text-lg md:text-2xl">
          Login with Google
        </span>
      </button>
    </div>
  );
};

export default login;
