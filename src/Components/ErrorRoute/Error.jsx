import { useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import animationData from "/public/404ErrorAnimation.json";

const Error = () => {
    const [windowWidth] = useState(window.innerWidth);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={550} width={windowWidth} />
      <Link to='/' className="flex mx-auto w-52">
        <button className="text-center inline-flex items-center gap-2 text-primaryColor font-bold text-xl"><TiArrowBack />Go Back to Home</button>
      </Link>
    </div>
  );
};

export default Error;
