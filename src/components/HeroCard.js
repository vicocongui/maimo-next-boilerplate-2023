import React from "react";
import Link from "next/link";
import Image from "next/image";
export const HeroCard = ({ heroShow }) => {
  const { name, id, image } = heroShow;//destructuring
  return (
    <div>
      <div className="w-full h-screen text-white flex flex-col justify-between relative border-solid">
        <div className="w-full h-screen">
          <Link href={`/show/${id}`}>
            <Image
              src={image?.original}
              width={680}
              height={1000}
              alt={name}
              className="h-full object-contain w-full p-2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};