// src/pages/index.jsx
"use client";
import { useEffect, useState } from "react";
import { Box } from "./components/Box";

export default function Home() {
  const [boxes, setBoxes] = useState<number[]>([]);
  const [lost, setLost] = useState(false);
  const [restart, setRestart] = useState(false);
  const [show, setShow] = useState<number[]>([]);
  const [mines, setMines] = useState<number>(1);
  useEffect(() => {
    startProgram();
  }, [restart]);

  const startProgram = () => {
    const gridSize = 25; // Assuming a 5x5 grid
    let arr = Array(gridSize).fill(1); // Initialize all cells with 1 (no mine)

    // Randomly place mines
    for (let i = 0; i < mines; i++) {
      let index;
      do {
        index = Math.floor(Math.random() * gridSize);
      } while (arr[index] === 0); // Ensure not placing a mine where one already exists
      arr[index] = 0; // Place mine
    }

    setBoxes(arr);
    setShow([]);
    console.log("Setted " + mines + " mines");
  };

  function handlClick(index: number) {
    console.log(boxes);
    setShow((show) => [...show, index]);
    if (boxes[index] === 0) {
      setLost(true);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center px-4 py-4">
      <div className="w-full bg-[#213743] h-full grid grid-cols-5">
        <div className="col-span-2">
          <div className="px-4 py-4 flex flex-col  w-full max-w-md text-gray-300 gap-2">
            <div >Mines</div>
            <input
              type="number"
              value={mines}
              onChange={(e) => setMines(parseInt(e.target.value))}
              className="bg-[#0F212E] border w-full border-gray-500 text-gray-300 px-3 py-1.5"
            />
            <button
              className="bg-green-400 text-[#213743] s w-full"
              onClick={startProgram}
            >
              Bet
            </button>
            {JSON.stringify(mines)}
          </div>
          {lost ? (
            <div className="flex flex-col justify-center items-center">
              <div className="text-white text-8xl">You lost!</div>
              <button
                onClick={() => {
                  setRestart(!restart);
                  setLost(false);
                }}
                type="button"
                className="w-32 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center"
              >
                Retry
              </button>
            </div>
          ) : null}
        </div>
        <div className="col-span-3 bg-[#0F212E] grid px-8 py-4">
          <div className="grid grid-cols-5 gap-4 px-12">
            {boxes.map((value, index) => (
              <Box
                key={index}
                onClick={() => {
                  lost ? null : handlClick(index);
                }}
                state={value ? "showGreen" : "showRed"}
                show={show.includes(index) ? true : false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
