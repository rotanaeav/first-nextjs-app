"use client";
import React, { useState } from "react";
export default function AlphabetDisplay() {
  const [letter, setLetter] = useState("0");
  return (
    <section>
      <h1 className="text-2xl">{letter}</h1>
      <section className="flex flex-row gap-2">
        <button
          className="border p-2 rounded"
          onClick={() => setLetter(letter + "A")}
        >
          A
        </button>
        <button
          className="border p-2 rounded"
          onClick={() => setLetter(letter + "B")}
        >
          B
        </button>
        <button
          className="border p-2 rounded"
          onClick={() => setLetter(letter + "C")}
        >
          C
        </button>
        <button
          className="border p-2 rounded"
          onClick={() => setLetter(letter + "D")}
        >
          D
        </button>
        <button
          className="border p-2 rounded"
          onClick={() => setLetter(letter + "E")}
        >
          E
        </button>
        <button
          className="border p-2 rounded"
          onClick={() => setLetter(letter + "F")}
        >
          F
        </button>
      </section>
    </section>
  );
}
