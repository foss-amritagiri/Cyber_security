import React, { useEffect, useState } from 'react'

interface indexProps {

}

const Index: React.FC<indexProps> = ({}) => {
 
  const [code, setCode] = useState(0)
 const [form, setForm] = useState(0)
  useEffect(() => {
    // call the codeGenerate only once
    codeGenerate()
    return () => {
     codeGenerate()
    }
  }, [])
  
  const codeGenerate = async() => {
    //generate random 4 digit code
  
    //slice the last 4 digits
    let tempCode = Math.floor(Math.random() * 9000) + 1000
    setCode(tempCode)
     await console.log(tempCode)
     //console log the code in font size of 20 px with a color of blue and a font family of monospace
      // await console.log(`%c ${tempCode}`, `font-size: 20px; color: blue; font-family: monospace;`)
   
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({form})
    console.log({code})
    //get the value of the input
    if(form === code){
      await alert('correct')
    } else {
      await alert('incorrect')
    }
  }
    return (
      <>
        <div>
           <form>
            <input onChange={(e) => setForm(parseInt(e.target.value)) } type="number" placeholder="Enter Code" />
            <button onClick={(e) => handleSubmit(e)} type="submit">Submit</button>

           </form>
          </div>      
      </>
    );
}

export default Index