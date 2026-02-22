"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Badge } from "./ui/badge"

const row1 = [
  { imgSrc: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { imgSrc: "https://images.pexels.com/photos/965345/pexels-photo-965345.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { imgSrc: "https://images.pexels.com/photos/8386365/pexels-photo-8386365.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { imgSrc: "https://images.pexels.com/photos/1933900/pexels-photo-1933900.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { imgSrc: "https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { imgSrc: "https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { imgSrc: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { imgSrc: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600" },
]

const row2 = [
  { imgSrc: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { imgSrc: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { imgSrc: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { imgSrc: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { imgSrc: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { imgSrc: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { imgSrc: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { imgSrc: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600" },
]

const InfiniteRow = ({ items, direction = "left" }: { items: typeof row1, direction?: "left" | "right" }) => {
  const scrollValue = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]

  return (
    <div className="flex overflow-hidden w-full">
      <motion.div
        animate={{ x: scrollValue }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-6 py-2 shrink-0"
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="relative w-72 h-44 group shrink-0 shadow-xl shadow-black/5 hover:scale-[1.02] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity rounded-2xl z-10" />
            <img
              src={item.imgSrc}
              alt=""
              className="w-full h-full object-cover rounded-2xl border border-border/50"
            />
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-primary/90 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                Category
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function HeroCarousel() {
  return (
    <div className="flex flex-col gap-6 w-screen overflow-hidden py-4">
      <InfiniteRow items={row1} direction="left" />
      <InfiniteRow items={row2} direction="right" />
    </div>
  )
}
