import Link from "next/link";
import Logo from "./logo";
import { social } from "../lib/constants";
import React from "react";

export default function Intro() {
  return (
    <header className="flex justify-between py-4 my-4">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex flex-row items-center gap-0 md:gap-1">
        {social.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            title={item.name}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-black hover:bg-white bg-black rounded-full p-2 md:p-3 text-lg"
          >
            {React.createElement(item.icon)}
          </Link>
        ))}
      </div>
    </header>
  );
}
