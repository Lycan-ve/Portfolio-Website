"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const AboutPage = () => {

    return <div className="h-full w-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-15">
        
        <motion.div className="h-[250px] w[250px] mb-10 lg:h-[500px] lg:w-[50%] lg:mt-10 relative"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]}}>
        <Image src={"/Biografia.png"} alt="" fill className="object-contain"/>
        </motion.div>

    
        {/* TEXT CONTAINER */}
    <div className="h-1/2 lg:h-full lg:w-1/2 p-4 sm:p-8 md:p-12 lg:p-15 flex flex-col gap-24 md:gap-32 lg:gap-48 xl:gap-64">

        {/* BIOGRAFÍA CONTAINER*/}
        <div className="flex flex-col justify-center text-white">

        {/* BIOGRAFÍA TITLE */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-white">ACERCA DE MI.</h1>

        {/* DESC */}
        <p className="text-lg sm:text-base lg:text-xl text-white font-extralight mt-3 lg:text-justify">¡Hola! Mi nombre es Frederick Beaumont, tengo 19 años y soy un apasionado del desarrollo web y diseño gráfico. Con un año de experiencia en el campo, me he destacado por mi creatividad y habilidad para plasmar ideas en proyectos visuales atractivos y funcionales.</p>

        <p className="text-lg sm:text-base lg:text-xl text-white font-extralight mt-3 lg:text-justify">Además, me desempeño como Transcriptor y Analista en documentación, donde mi precisión y atención al detalle han sido clave para garantizar la calidad de los trabajos que realizo.</p>

        <p className="text-lg sm:text-base lg:text-xl text-white font-extralight mt-3 lg:text-justify">Soy TSU (Técnico Superior Universitario) en Informática, lo que me ha brindado una base sólida de conocimientos técnicos y habilidades que complementan mi perfil como profesional del mundo digital.</p>

        <p className="text-lg sm:text-base lg:text-xl text-white font-extralight mt-3 lg:text-justify">En mi portafolio podrás encontrar una muestra de mis proyectos y trabajos realizados, que reflejan mi pasión por la creatividad y la excelencia en cada detalle. Estoy comprometido en seguir creciendo y aprendiendo en esta área, buscando siempre superar mis propias expectativas y las de mis clientes. ¡Estoy emocionado por mostrarte mi trabajo!</p>
        </div>

         {/* HABILIDADES CONTAINER */}
    <div className="flex flex-col gap-12 justify-center">
        {/* HABILIDADES TITLE */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-white">HABILIDADES.</h1>
        {/* HABILIDADES LIST*/}
        <div className="flex gap-4 flex-wrap">
            <div className="rounded p-2 text-sm cursor-pointer border border-white bg-white hover:bg-transparent hover:text-white">Javascript</div>
            <div className="rounded p-2 text-sm cursor-pointer border border-white bg-white hover:bg-transparent hover:text-white">Typescript</div>
            <div className="rounded p-2 text-sm cursor-pointer border border-white bg-white hover:bg-transparent hover:text-white">React.js</div>
            <div className="rounded p-2 text-sm cursor-pointer border border-white bg-white hover:bg-transparent hover:text-white">Next.js</div>
            <div className="rounded p-2 text-sm cursor-pointer border border-white bg-white hover:bg-transparent hover:text-white">Tailwind CSS</div>
            <div className="rounded p-2 text-sm cursor-pointer border border-white bg-white hover:bg-transparent hover:text-white">Golang</div>
            <div className="rounded p-2 text-sm cursor-pointer border border-white bg-white hover:bg-transparent hover:text-white">PHP</div>
            <div className="rounded p-2 text-sm cursor-pointer border border-white bg-white hover:bg-transparent hover:text-white">Laravel</div>
            <div className="rounded p-2 text-sm cursor-pointer border border-white bg-white hover:bg-transparent hover:text-white">Mongodb</div>
            <div className="rounded p-2 text-sm cursor-pointer border border-white bg-white hover:bg-transparent hover:text-white">MySql</div>
        </div>
    </div>
    </div>
</div>
    
}

export default AboutPage