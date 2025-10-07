import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const placeholders = [
    "Ask me to generate any code snippet...",
    "Type a coding problem or request a snippet",
    "Need a quick function? Just ask!",
  ];

  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < placeholders[phraseIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + placeholders[phraseIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 60);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setPhraseIndex((prev) => (prev + 1) % placeholders.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, phraseIndex]);
  return (
    <div className=" flex flex-col items-center justify-center pt-20">
      <p className="text-md sm:text-2xl pb-5">Ready To Generate Code ?</p>
      <h1 className=" text-xl sm:text-5xl text-center font-bold">
        <span className="text-[#ff7300]">AI Code Snippet Generator </span>
        That
        <br />
        <p className="py-5"> Empowers Developers</p>
      </h1>
      <div className="flex flex-col sm:flex-row gap-8  pt-10 sm:pt-20">
        <div className="relative flex justify-center w-full flex-col sm:flex-row gap-4">
          <div className="absolute inset-0 flex justify-center">
            <div className="w-[500px] h-[120px] bg-orange-300 opacity-40 blur-2xl rounded-full"></div>
          </div>
          <input
            type="text"
            placeholder={displayedText}
            className="z-10 px-4 py-3 border-2 border-[#ff7300] rounded-md w-[300px] sm:w-[500px] bg-white"
          />
          <Link
            to="/dashboard"
            className=" z-10 bg-black text-white text-lg font-semibold px-4 w-[300px] sm:w-auto py-3 rounded hover:scale-110 transition-all ease-in-out cursor-pointer"
          >
            Generate code
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Hero;
