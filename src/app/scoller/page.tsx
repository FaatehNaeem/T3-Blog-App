"use client"
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

function Page() {
    const [items,setItems] = useState(Array.from({length:30}))

    const fetchData = () =>{
        setTimeout(()=>(
            setItems(items.concat(Array.from({length:10})))
        ),1500)
    }
  return (
    <div className='bg-black h-full'>
    <InfiniteScroll
  dataLength={items.length} //This is important field to render the next data
  hasMore={true}
  loader={<h4 className='mt-2 text-2xl text-center text-white'>Loading...</h4>}
  next={fetchData}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
>
  {items.map((_,index)=>(
    <div key={index} className='w-full bg-black flex justify-center items-center'>
        <p className='text-5xl text-white'>{index}</p>
    </div>
  ))}
</InfiniteScroll>
</div>
  )
}

export default Page