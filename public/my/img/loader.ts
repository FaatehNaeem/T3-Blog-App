'use client'

interface ImageProperties{
    src: string,
    width: string,
    quality:number
}

export default function myImageLoader({ src, width, quality }: ImageProperties) {
    // Check for the svgrepo domain
    if (src.startsWith('https://www.svgrepo.com/')) {
        return src; // Return the original src for svgrepo images
    }
    if (src.startsWith('https://static-00.iconduck.com/')) {
        return src; // Return the original src for svgrepo images
    }
    if (src.startsWith('https://seeklogo.com/')) {
        return src; // Return the original src for svgrepo images
    }
    if (src.startsWith('https://trpc.io/')) {
        return src; // Return the original src for svgrepo images
    }
    if (src.startsWith('https://static-00.iconduck.com/')) {
    return src; // Return the original src for svgrepo images
    }
    if (src.startsWith('https://www.logo.wine/')) {
    return src; // Return the original src for svgrepo images
    }
    if (src.startsWith('https://png.pngtree.com/')) {
    return src; // Return the original src for svgrepo images
    }
    if (src.startsWith('https://static.vecteezy.com/')) {
    return src; // Return the original src for svgrepo images
    }
    if (src.startsWith('https://icons.veryicon.com/')) {
    return src; // Return the original src for svgrepo images
    }
    if (src.startsWith('https://cdn3.iconfinder.com/')) {
    return src; // Return the original src for svgrepo images
    }
    if (src.startsWith('https://www.svgrepo.com/show/')) {
    return src; // Return the original src for svgrepo images
    }
    if (src.startsWith('https://pngimg.com/')) {
    return src; // Return the original src for svgrepo images
    }
    // Default behavior for your existing domain
    return `https://nsiteam.com/${src}?w=${width}&q=${quality || 75}`;
}