import Link from "next/link";
import Container from "./container";
import React from "react";
import { social } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2 text-black px-5">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center justify-between">
          <h1 className="text-6xl font-thin ml-2 text-black hidden md:block font-rhd">
            Match<span className="font-bold">Point</span> Times
          </h1>
          <div className="flex flex-row items-center gap-1">
            {social.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                title={item.name}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-white hover:bg-accent-7 bg-accent-1 rounded-full p-3 text-lg"
              >
                {React.createElement(item.icon)}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
