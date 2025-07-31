import { api } from "~/trpc/server";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await api.category.getCatgoryByName({categoryName:"Gen ai"})
  console.log(category)
  // let x =await category.then((res)=>{
  //   return res
  // }
  // )
  return (
    <div>
      <p>my Post:{slug}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 p-6 justify-center items-center">
                {category?.map((blog, index) => (
                
                  <Card
                    key={index}
                    className="cursor-pointer rounded-md bg-background text-foreground shadow-card"
                  >
                    {blog.blogs.map((blogg)=>(

<>
                 
                    <img src={blogg.blogImage} alt="error loading image" className="w-full rounded-sm"/>
      
                    <CardHeader className="p-6 h-36">
                      <CardTitle className="font-bold text-foreground drop-shadow-sm">
                        {blogg.title}
                      </CardTitle>
                      <CardDescription className="break-words">{blogg.description.length>=100 ? blogg.description.slice(0,100) + "..." : blogg.description}</CardDescription>
      
                    </CardHeader>
      
                    <CardFooter className="m-0 flex w-full flex-row items-center py-0">
                      <Avatar className="bottom-3">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
      
                      {/* <div className="flex flex-col items-center">
                        <CardTitle className="text-foreground">{blogg.creator.username}</CardTitle>
                        <CardContent className="text-sm text-zinc-900">
                          October 8, 2023
                        </CardContent>
                      </div> */}
                    </CardFooter>
                    </>
                     ))}
                  </Card>
                ))}
              </div>
    </div>
  );
}
