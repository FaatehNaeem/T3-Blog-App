'use client'

export default function myImageLoader({ src, width, quality }) {
    return `https://nsiteam.com/${src}?w=${width}&q=${quality || 75}`
}