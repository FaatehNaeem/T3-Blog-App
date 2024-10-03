'use client'

interface imageProperties{
    src: string,
    width: string,
    quality:number
}

export default function myImageLoader({ src, width, quality }:imageProperties) {
    return `https://nsiteam.com/${src}?w=${width}&q=${quality || 75}`
}