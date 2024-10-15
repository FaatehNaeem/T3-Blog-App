"use client"
import React from 'react'
import { Badge } from "~/components/ui/badge";
import Image from 'next/image';


export default function BlogInfo() {

    return (
      <>
        <Image
          src="social/wp-content/uploads/2015/12/blog-background-2.jpg"
          alt="Image"
          width="600"
          height="600"
          className="mx-auto mt-4"
        />
        <br />
        <br />
        <br />
        <h2 className="text-center text-2xl font-bold">BLOG TITLE</h2>
        <div className="mt-2 flex w-screen items-center justify-center gap-2">
          <Badge variant={"destructive"}>Cateogory 1</Badge>
          <Badge>Category 2</Badge>
          <Badge variant={"outline"}>Category 3</Badge>
        </div>
        <div className="mx-auto mt-4 w-[90%] bg-background2 p-12">
          <p className="text-center">
            This is the blog description : Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Error qui consequuntur, sapiente,
            numquam atque facilis deserunt corrupti, cum sunt modi neque ex id
            animi? Eius architecto culpa adipisci nulla. Ab ex nihil dignissimos
            ipsum optio, sed ea.
          </p>
          <p className="mt-4 text-center">
            Alias sapiente hic repellendus reiciendis? Velit, quibusdam culpa.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Praesentium illo exercitationem at dolorum corporis aspernatur
            aliquid excepturi. Saepe corporis, obcaecati maiores incid
          </p>
          <p className="mt-4 text-center">
            Alias sapiente hic repellendus reiciendis? Velit, quibusdam culpa.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Praesentium illo exercitationem at dolorum corporis aspernatur
            aliquid excepturi. Saepe corporis, obcaecati maiores incid
          </p>
          <p className="mt-8 text-right font-bold text-zinc-950">
            Created by - Faateh
          </p>
        </div>
        <br />
        <br />
        <br />
        <br />
      </>
    );
}

