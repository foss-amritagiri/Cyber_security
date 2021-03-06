import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'

import { doc, setDoc,addDoc,collection,increment,onSnapshot,updateDoc } from "firebase/firestore"; 
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
 const [seats, setSeats] = useState(0)
  useEffect(() => {
    // call the codeGenerate only once
    codeGenerate()
    CurrentCount()
    return () => {
     codeGenerate()
    }
  }, [])
  const CurrentCount = () => {
    const unsub = onSnapshot(doc(db,"count","no"),(doc:any) => {
      let data = doc.data()
      setSeats(parseInt(data?.no))
    })
    return () => {
      unsub()
    }
  }
  const AddData = async() => {
   
    try{
      //@ts-ignore
      //write data to firestore
     
      const docRef = await addDoc(collection(db, "users"), form);
      const docRef2 = doc(db,"count","no");
      await updateDoc(docRef2,{no:increment(1)})
      setConfirmed({
        matched: true,
        state: true
      })
    

    } catch(error){
      alert(error);
    }
  }

  const codeGenerate = async() => {
    //generate random 4 digit code
  
    //slice the last 4 digits
    let tempCode = Math.floor(Math.random() * 9000) + 1000
    setCode(tempCode)
    // store the code in the cookie
    document.cookie = `code=${tempCode}`
    
    await localStorage.setItem("Key", tempCode.toString());
   
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    //get the value of the input
   
    if(parseInt(form?.code) === code){
    
    
      
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

  const RegOver = () => (
    <>
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
  </>
  )
 
    return (
      <>
        
          <Layout>
        
            <div className='w-full sm:w-3/6 h-full mx-auto flex justify-center align-center pt-12'>
            <div className="bg-white h-full shadow-md rounded w-full px-8 pt-6 pb-8 mb-4  justify-center align-center">
              <div className="flex justify-center">
                <h1 className="text-2xl font-bold text-center text-[#822699]">
                  Amrita Cyber Security Club 
                </h1>
                <br/>
               
                </div>
                <div>
                <h2 className="text-xl mt-4 font-bold text-center text-[#822699]">
                  Registration Form
                </h2>
                <p className='text-sm mt-4 text-right font-sans'>Seats Left: {50 - seats} </p>
                </div>
                {seats >= 50 ? RegOver() :

                state === 0 ? 
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
                        className="appearance-none block text-sm w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        id="email"
                        type="email"
                        required
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
                <p className='text-sm mt-4 text-right font-sans'>*Limited Seats (FCFS)</p>
               
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
                      Hint: Check browser cookie/local storage for secret code
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
                <div className="w-full px-3 py-12 text-center">
                  
                 <img 
                  className="w-full h-full"
                  src="https://i.pinimg.com/originals/70/ce/41/70ce41310f8a9c2a84e97b57198015d9.gif"
                  alt='Wrong'
                  /> 

                  <h1 className="text-center text-gray-700 mt-4 mb-2 text-xl font-bold">
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