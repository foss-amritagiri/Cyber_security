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
     await console.log("Secret Key:",tempCode)
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

  const CheckFields = () => {
    if(form?.name === "" || form?.email === "" || form?.reg === ""){
      alert("Please fill all the fields")
    }
     else {
      setState(1)
    }
  }
    return (
      <>
        
          <Layout>
        
            <div className='w-full sm:w-3/6 h-full mx-auto flex justify-center align-center pt-12'>
            <div className="bg-white h-full shadow-md rounded w-full px-8 pt-6 pb-8 mb-4  justify-center align-center">
              <div className="flex justify-center">
                <h1 className="text-2xl font-bold text-center text-[#822699]">
                  Amrita Cyber Security Club Registration
                </h1>
                
               
                </div>
                {state === 0 ? 
          <>
                <form>
                  <div className="mt-4 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        id="name"
                        required
                        type="text"
                        placeholder="Elliot Alderson"
                      />
                    </div>
                   
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="reg">
                        Registration Number
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={form.reg}
                        onChange={(e) => setForm({ ...form, reg: e.target.value })}
                        id="reg"
                        required
                        type="text"
                        placeholder="962318104001"
                      />
                    </div>
                    <div className="flex w-full px-3 gap-4">
                      <div className='flex-wrap w-full'>
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                        Year
                      </label>
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      value={form.year}
                      required
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      >
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                      </select>
                      </div>
                      <div className='flex-wrap w-full'>
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                        Dept
                      </label>
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      value={form.dept}
                      required
                      onChange={(e) => setForm({ ...form, dept: e.target.value })}
                      >
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="MECH">MECH</option>
                        <option value="CIVIL">CIVIL</option>
                        </select>
                      </div>
                    </div>
                    </div>
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        id="email"
                        type="email"
                        placeholder="50c13ty@protonmail.com"
                      />
                    </div>
              
              <div className="flex justify-center mt-10">
               
                <button
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 w-full  rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => CheckFields()}
                >
                  Submit
                </button>
                </div>
                </form>
                </>
            : <>
              <form>
              {!confirmed.state && 
              <>
              <div className="w-full px-3 mt-24 mb-28 text-center">
                      <label className="block  uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="email">
                        Enter Secret Code
                      </label>
                      <input
                        value={form?.code}
                        onChange={(e) => setForm({ ...form, code: e.target.value })}
                        className="appearance-none block text-center w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="code"
                        type="text"
                        placeholder="* * * *"
                      />
                     
                      <p className="text-xs text-gray-700">
                      Hint: Check browser console for secret code
                      </p>
                    </div>
                    <div className="flex justify-center mt-10">
               
               <button
                 className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                 type="button"
                 //@ts-ignore
                 onClick={(e) => handleSubmit(e)}
               >
                 Hack In !
               </button>
               </div>
               </>
               }
               {confirmed?.matched && 
               <>
             
              <video 
              className="w-full h-full p-4"
              autoPlay
              loop={false}
              muted
              playsInline
              src='/confirm.mp4'
              />
               <h1 className="text-center text-md font-bold text-gray-700">
                Congrats ! You Made it ! You are now a part of the team.
                </h1>
               
              </>
              }
                {confirmed?.state && !confirmed?.matched &&
                <div className="w-full px-3 mt-24 mb-28 text-center">
                  <image
                  //@ts-ignore
                   src="https://media.makeameme.org/created/you-stupid-donkey-6e2d2233c6.jpg"
                    className="w-full h-full p-4"
                    alt="Wrong"
                  />
                  <h1 className="text-center text-gray-700 text-xl font-bold">
                    Wrong Code
                  </h1>
                  <button
                  onClick={() => setConfirmed({ matched:false, state: false})}
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Try Again
                  </button>
                </div>
                }
              </form>
            </> }

              </div>
            </div>
           

          </Layout>
      </>
    );
}

export default Index