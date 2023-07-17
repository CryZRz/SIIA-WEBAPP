import React from "react";
import { Link } from "react-router-dom";
import { pathAPIImages } from "../helpers/constants";

export default function CardProfileLi({
  id,
  name,
  lastName,
  image,
}: {
  id: number;
  name: string;
  lastName: string;
  image: string;
}) {
  return (
    <div className="flex items-center justify-center p-1">
      <div className="w-12 h-12">
        <img
          className="rounded-full w-full h-full"
          src={`${pathAPIImages}/profiles/${image}`}
          alt=""
        />
      </div>
      <Link to={`/profile/${id}`}>
        <h3 className="inline ml-2">
          {name} {lastName}
        </h3>
      </Link>
    </div>
  );
}
