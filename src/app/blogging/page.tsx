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
    body:JSON.stringify({prompt:"Suggest 5 better alternative blog titles based on this partial input: 'How AI works. Ps: just give 5 alternative blog titles... Nothing else... without any brackets... just 5 blog titles list as 1) blog title . 2) blog title.... and so on"}),
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