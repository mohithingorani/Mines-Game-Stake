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
    if (mines <= 24) {
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

      setLost(false);
      setBoxes(arr);
      setShow([]);
    }
  };

  const handleClick = (index: number) => {
    setShow((prevShow) => [...prevShow, index]);
    if (boxes[index] === 0) {
      setLost(true);
    }
  };

  return (
    //Full Page
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2C38]">
      <div className=" grid grid-cols-4">
        <div className="col-span-1  bg-[#213743]">
          <div className="px-4 py-4 flex flex-col w-full max-w-md text-gray-300 gap-2">
            <div>Mines</div>
            <input
              type="number"
              max="24"
              value={mines}
              onChange={(e) => setMines(Math.min(parseInt(e.target.value), 24))}
              className="bg-[#0F212E] border w-full border-gray-500 text-gray-300 px-3 py-1.5"
            />
            <button
              className="bg-green-400 text-[#213743] w-full hover:bg-green-500"
              onClick={startProgram}
            >
              Bet
            </button>
            {mines > 24 && (
              <div className="text-red-500">Mines cannot exceed 24</div>
            )}
          </div>

          {lost && (
            <div className="flex flex-col justify-center items-center">
              <div className="text-white text-4xl">You lost!</div>
              <button
                onClick={() => {
                  setRestart(!restart);
                  setLost(false);
                }}
                type="button"
                className="w-32 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center"
              >
                Retry
              </button>
            </div>
          )}
        </div>
        <div className="col-span-3 bg-[#0F212E] grid px-32 py-8 rounded-md">
          <div className="grid grid-cols-5 ">
            {boxes.map((value, index) => (
              <div key={index} className="p-2">
                <Box
                  onClick={() => {
                    if (!lost) handleClick(index);
                  }}
                  state={value ? "showGreen" : "showRed"}
                  show={show.includes(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
