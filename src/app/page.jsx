"use client"
import React from "react";
import Image from "next/image"
import { TypeAnimation } from 'react-type-animation';
import Link from "next/link";

const Homepage = () => {
  return <div className=" h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-15">

    {/* IMAGE CONTAINER */}
    <div className="h-1/2 relative lg:hidden ">
      <Image src={"/logo.png"} alt="" fill className="object-contain "/>
    </div>

    {/* TEXT CONTAINER */}
    <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col text-center items-center justify-center lg:text-start lg:items-start">

      {/* PRESENTATION */}
      <h1 className="text-base sm:text-2xl lg:text-3xl text-white">HOLA, SOY FREDERICK</h1>

      {/* TITLE */}
      <h1 className="text-4xl sm:text-6xl lg:text-8xl text-white font-extrabold">
        <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Desarrollador Web',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Diseñador Gráfico',
        1000,
        'Analista',
        1000,
        'Transcriptor',
        1000
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
    /></h1>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-10">
        <button className="p-4 rounded-lg ring-1 text-black ring-white bg-white inline-flex items-center hover:bg-gray-300">
          <Image src={"/CV.png"} width="30" height="30" className="mr-2"/>
            <Link href={""}>Descargar mi CV</Link>
        </button>
        <button className="p-4 rounded-lg ring-1 text-black ring-white bg-white hover:bg-transparent hover:text-white">
          <a href="Trabajos">Ver Mis Trabajo</a>
          </button>
      </div>
    </div>

        {/* IMAGE CONTAINER */}
    <div className="sm:h-min lg:h-[600px] lg:w-1/2 relative">
      <Image src={"/logo.png"} alt="" fill className="object-contain"/>
    </div>
  </div>
}

export default Homepage