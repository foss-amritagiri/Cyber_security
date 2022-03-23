import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'

import { doc, setDoc,addDoc,collection } from "firebase/firestore"; 
import { db } from '../components/API/Config';
import Image from 'next/image'
interface indexProps {

}

const Index: React.FC<indexProps> = ({}) => {
 
  const [code, setCode] = useState<any>()
 const [form, setForm] = useState<any>({
    name: '',
    email: '',
    reg: '',
    dept: "CSE",
    year: "I",
    code: '',
 })
 const [state, setState] = useState(0)
 const [confirmed, setConfirmed] = useState({
   matched: false,
   state:false
 })
  useEffect(() => {
    // call the codeGenerate only once
    codeGenerate()
    return () => {
     codeGenerate()
    }
  }, [])
  
  const AddData = async() => {
   
    try{
      //@ts-ignore
      //write data to firestore
     
      const docRef = await addDoc(collection(db, "users"), form);
      
    

    } catch(error){
      alert(error);
    }
  }

  const codeGenerate = async() => {
    //generate random 4 digit code
  
    //slice the last 4 digits
    let tempCode = Math.floor(Math.random() * 9000) + 1000
    setCode(tempCode)
     await console.log("Secret Key:",'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
     //console log the code in font size of 20 px with a color of blue and a font family of monospace
      // await console.log(`%c ${tempCode}`, `font-size: 20px; color: blue; font-family: monospace;`)
   
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    //get the value of the input
   
    if(parseInt(form?.code) === code){
      setConfirmed({
        matched: true,
        state: true
      })
    
      
      await AddData()
    } else {
      setConfirmed({
        matched: false,
        state: true
      })
    }
  }
    return (
      <>
        
          <Layout>
        
            <div className='w-full sm:w-3/6 h-full mx-auto flex justify-center align-center pt-12'>
            <div className="bg-white h-full shadow-md rounded w-full px-8 pt-6 pb-8 mb-4  justify-center align-center">
              <div className="flex justify-center">
                <h1 className="text-2xl font-bold text-center text-[#822699]">
                  Amrita Cyber Security Club
                </h1>
                
               
                </div>
               
                <div className="flex justify-center mt-12 mb-12">
                  <img src="https://thumbs.gfycat.com/NimbleComfortableFruitfly-size_restricted.gif" className="w-full h-full" />
                  </div>

                <div>
                  <h1 className="text-2xl font-bold text-center text-[#822699]">
                    Sorry ! Registration Over !
                  </h1>
                  <p className="text-center mt-4">
                      Thanks for your interest in Amrita Cyber Security Club.
                  </p>
                </div>
           
            </div>
          </div>
           

          </Layout>
      </>
    );
}

export default Index