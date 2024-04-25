import React from 'react'

export const SendSomeData = () => {

    const handleClick=async ()=>
    {
        const response=await fetch('http://localhost:3000/addData', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({bio:"hello this my bio"}),
            credentials: 'include'
        });

        const respo=await response.json();
        console.log(respo)
    }
  return (
    <button onClick={handleClick}>SendSomeData</button>
  )
}
