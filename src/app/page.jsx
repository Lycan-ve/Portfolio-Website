import Image from "next/image"

const Homepage = () => {
  return <div className=" h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-15">

    {/* IMAGE CONTAINER */}
    <div className="h-1/2 relative lg:hidden">
      <Image src={"/logo.png"} alt="" fill className="object-contain "/>
    </div>

    {/* TEXT CONTAINER */}
    <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col items-center justify-center lg:items-start">

      {/* PRESENTATION */}
      <h1 className="text-base sm:text-2xl lg:text-3xl text-white">HOLA, SOY FREDERICK</h1>

      {/* TITLE */}
      <h1 className="text-4xl sm:text-6xl lg:text-8xl text-white font-extrabold">MULTITAREAS</h1>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-10">
        <button className="p-4 rounded-lg ring-1 text-white ring-white">Descargar mi CV</button>
        <button className="p-4 rounded-lg ring-1 text-black ring-white bg-white">Ver Mis Trabajos</button>
      </div>
    </div>

        {/* IMAGE CONTAINER */}
    <div className="sm:h-min lg:h-full lg:w-1/2 relative">
      <Image src={"/logo.png"} alt="" fill className="object-contain"/>
    </div>
  </div>
}

export default Homepage