import React from "react";
import { useState } from "react";
import axios from 'axios'
function Home() {
  const [file, setfile] = useState(null)
  const [message, setmessage] = useState("")
  const [Loader, setLoader] = useState(false)
  const handleFileChange = (e)=>{
    setfile(e.target.files[0])
    setmessage("")
  }
  const handleConvert = async(e)=>{
    try {
      e.preventDefault();
      const formData =new FormData()
      formData.append("fileinput",file)
      let response = await axios.post("/api/convertFile",formData,{responseType:"blob"})
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href= url
      link.setAttribute("download",file.name+".pdf")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      setfile(null)
      setmessage(response.headers['message'])
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  }
  return (
    <>
      <div className="md:px-30 px-6 w-full sm:w-full h-[90%] flex items-center bg-gray-950 text-gray-400">
        <div className="flex items-center justify-center flex-col border-2 border-dashed w-[50%] px-6 mx-auto h-[50%] rounded-lg">
          <div className=" px-4 px-y md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg">
            {
              Loader? <div className="absolute z-20 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-l-emerald-300 animate-spin"></div>
              </div>:null
            }
            <h1 className="text-3xl font-bold text-center mb-4">
              Convert Word to PDF Online
            </h1>
            <p className="text-sm text-center mb-2">
              Easily Convert Word Documents to PDF format online, without having
              to install any software
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 w-full relative">
            <input
              type="file"
              accept=".doc, .docx"
              className="hidden"
              id="fileinput"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileinput"
              className="w-[90%] flex justify-center items-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg border-blue-300 cursor-pointer hover:bg-blue-700 hover:text-white duration-300"
            >
              <span className="text-2xl mr-2">{file? file.name:"Choose File"}</span>
            </label>

            <button 
            className={` ${file?" bg-blue-500 text-white": "bg-gray-500 text-black"} rounded-lg md:px-8 md:py-2 px-4 py-1`} disabled={!file}
            onClick={(e)=>{handleConvert(e);setLoader(true)}}
            >
              Convert File
            </button>
            {message? <p className="absolute bottom-[-20px]">{message}</p>:null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
