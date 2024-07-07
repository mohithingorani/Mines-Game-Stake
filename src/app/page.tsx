// src/pages/index.jsx
"use client"
import { useEffect, useState } from "react";
import { Box } from "./components/Box";

export default function Home() {
  const [boxes, setBoxes] = useState<number[]>([]);
  const [lost, setLost] = useState(false)
  const [restart, setRestart] = useState(false)
  const [show, setShow] = useState<number[]>([])
  useEffect(() => {
    startProgram();
  }, [restart]);

  const startProgram = () => {
    const value = Math.floor(Math.random() * 25);
    console.log(value);
    let arr = [];
    for (let i = 0; i < 25; i++) {
      if (i === value) {
        arr.push(0);
      } else {
        arr.push(1);
      }
    }
    let arr2 = []

    setBoxes(arr);
    setShow([])
  };


  function handlClick(index: number) {
    setShow(show => [...show, index])
    if (boxes[index] === 0) {
      setLost(true)
    }
  }



  return (
    <div className="h-screen w-full flex flex-col justify-center items-center px-4 py-4">
      <div className="w-full bg-[#213743] h-full grid grid-cols-5">
        <div className="col-span-2">
          {lost ? <div className="flex flex-col justify-center h-full items-center"><div className="text-white text-8xl">You lost!</div>
            <button onClick={()=>{setRestart(!restart)
              setLost(false)
            }} type="button" className="w-32 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center">Retry</button>

          </div> : null}
        </div>
        <div className="col-span-3 bg-[#0F212E] grid px-8 py-4">
          <div className="grid grid-cols-5 gap-4 px-12">
            {boxes.map((value, index) => (
              <Box key={index} onClick={() => { lost ? null : handlClick(index) }} state={value ? "showGreen" : "showRed"} show={show.includes(index) ? true : false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
