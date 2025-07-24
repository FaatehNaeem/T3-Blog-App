"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "~/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"

const imageArr = [
  {imgSrc:"https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"},
  {imgSrc:"https://media.istockphoto.com/id/838816304/photo/mauricie-national-park.jpg?s=612x612&w=0&k=20&c=A7EG0vrX7bIIxWdrP3VBwTnph0IaKL_Oxkbn9DChXKY="},
  {imgSrc:"https://media.istockphoto.com/id/508819120/photo/bridge-to-the-sea.jpg?s=170667a&w=0&k=20&c=dZmqNzNMYy14bmhQTmPIFICdDgcsGjZmvwo1-9PJZG8="},
  {imgSrc:"https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"},
  {imgSrc:"https://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg"},
]

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
 <Carousel className="w-full max-w-2xl" opts={{loop:true}} plugins={[plugin.current]}
>
      <CarouselContent className="-ml-1">
        {imageArr.map((data, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div>
              <Card className="bg-black border-2 border-secondary">
                <CardContent className="flex items-center justify-center aspect-square p-1">
                  <img src={data.imgSrc} alt="" className="aspect-square rounded-2xl"/>
                  {/* <span className="text-2xl font-semibold">{index + 1}</span> */}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
