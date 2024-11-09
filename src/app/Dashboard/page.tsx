import Link from 'next/link'
import React from 'react'
import { Button } from '~/components/ui/button'
export default function Page() {
  return (
    <div className='bg-background w-screen h-screen flex items-center flex-col'>
        <p>This is the dashboard</p>
        <Link href={"/Dashboard/create-blog"}>
        <Button>Create a Blog Post</Button>
        </Link>
    </div>
  )
}

