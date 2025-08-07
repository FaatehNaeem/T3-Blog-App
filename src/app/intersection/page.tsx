"use client"
import React from "react";
import { useInView } from "react-intersection-observer";

const Component = () => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <div ref={ref}>
      <h2 className="text-center text-lg">{`Header inside viewport ${inView}.`}</h2>
    </div>
  );
};

export default Component