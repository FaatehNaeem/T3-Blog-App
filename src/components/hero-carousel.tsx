"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "~/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel"
import { Badge } from "./ui/badge"

const imageArr = [
  {imgSrc:"https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?_gl=1*qpzo17*_ga*MTY4ODE2NjQ4Ni4xNzUzNDY2NTUz*_ga_8JE65Q40S6*czE3NTM0NjY1NTMkbzEkZzEkdDE3NTM0NjY1NjIkajUxJGwwJGgw"},
  {imgSrc:"https://images.pexels.com/photos/965345/pexels-photo-965345.jpeg?_gl=1*1t381eg*_ga*MTY4ODE2NjQ4Ni4xNzUzNDY2NTUz*_ga_8JE65Q40S6*czE3NTM0NjY1NTMkbzEkZzEkdDE3NTM0NjY2MTkkajU2JGwwJGgw"},
  {imgSrc:"https://images.pexels.com/photos/8386365/pexels-photo-8386365.jpeg?_gl=1*3k8q02*_ga*MTY4ODE2NjQ4Ni4xNzUzNDY2NTUz*_ga_8JE65Q40S6*czE3NTM0NjY1NTMkbzEkZzEkdDE3NTM0NjY2NDkkajI2JGwwJGgw"},
  {imgSrc:"https://images.pexels.com/photos/1933900/pexels-photo-1933900.jpeg?_gl=1*ha62ls*_ga*MTY4ODE2NjQ4Ni4xNzUzNDY2NTUz*_ga_8JE65Q40S6*czE3NTM0NjY1NTMkbzEkZzEkdDE3NTM0NjY2NzYkajU5JGwwJGgw"},
  {imgSrc:"https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg?_gl=1*gha0ma*_ga*MTY4ODE2NjQ4Ni4xNzUzNDY2NTUz*_ga_8JE65Q40S6*czE3NTM0NjY1NTMkbzEkZzEkdDE3NTM0NjY3MDAkajM1JGwwJGgw"},
]

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
 <Carousel className="w-full max-w-2xl" 
 opts={{loop:true}} 
 plugins={[plugin.current]}
 onMouseEnter={plugin.current.stop}
 onMouseLeave={plugin.current.play}
>
      <CarouselContent className="-ml-1">
        {imageArr.map((data, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div>
              <Card className="bg-black border-2 border-secondary">
            <CardContent className="flex flex-col items-center justify-center aspect-auto p-1">
                  <img src={data.imgSrc} alt="" className="aspect-auto rounded-2xl shadow-lg shadow-primary w-full h-auto sm:h-96 md:h-48 opacity-80 cursor-pointer hover:brightness-125"/>
                  <Badge className="bg-black text-white absolute bottom-1 right-1">Hello</Badge>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
