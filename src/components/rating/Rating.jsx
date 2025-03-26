"use client";
import { Rate } from "antd";
import React from "react";

const RatingPage = ({ star, count }) => {
  const MAX_STARS = 5;
  const filledStars = Math.max(0, Math.min(star, MAX_STARS)); // Ensure star count is between 0 and MAX_STARS
  const emptyStars = MAX_STARS - filledStars;

  return (
    <div>
      <Rate allowHalf defaultValue={2.5} value={star} color={"#77878f"} />
      <span className="ml-2 text-sm text-gray-600">
        {count} reviews
      </span>
    </div>
  );
};

export default RatingPage;
