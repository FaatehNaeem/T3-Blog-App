"use client"
import { useState } from 'react';

function Page() {

    const [data,setData] = useState<string>();

    const handleclick = async()=>{
    const response = await fetch('/api/gemini-ai-model',
    {method:"POST",
     headers: {
    "Content-Type": "application/json"
},
    body:JSON.stringify({prompt:"who are you"}),
})
    const output = await response.json()
    // console.log(output.data)
    setData(output.data)
    }

  return (

    <div>
        <h1>p</h1>
        <button onClick={handleclick}>click me</button>
        <p>data rendered: {data}</p>
        </div>
  )
}

export default Page