"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import NavLink from "./navlink"
import { motion } from "framer-motion"

const links = [
    {url: "/", title: "Inicio"},
    {url: "/Biografia", title: "Biografia"},
    {url: "/Trabajos", title: "Trabajos"},
    {url: "/Contactos", title: "Contactos"},
]

const Navbar = () => {
    const [open,setOpen] = useState(false)

    const topVariants={
        closed:{
            rotate:0,
        },
        opened:{
            rotate:45,
        }
    }

    const centerVariants={
        closed:{
            opacity:1,
        },
        opened:{
            opacity:0,
        }
    }

    const BottomVariants={
        closed:{
            rotate:0,
        },
        opened:{
            rotate:-45,
        }
    }

    const listVariants = {
        closed:{
            x:"100vw"
        },
        opened:{
            x:0,
        }
    }

    return (
        <div className="h-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-15">
            
            {/*LYCAN*/}
            <div className="text-white text-3xl sm:text-5xl sm:mr-10 lg:text-7xl lg:mr-20" >
                <Link href="/" className="font-extralight">LYCAN_VE</Link>
            </div>

            {/* NAVEGACION */}

            <div className="text-white hidden md:flex gap-8 mr-60">{links.map(link=>(
                <NavLink link={link} key={link.title}/>
                ))}</div>

                <div className="hidden md:flex gap-4">
                <Link href="/">
                <Image src={"/github.png"} alt="" width={24} height={24}/>
                </Link>
                <Link href="/">
                <Image src={"/discordia.png"} alt="" width={24} height={24}/>
                </Link>
                <Link href="/">
                <Image src={"/gorjeo.png"} alt="" width={24} height={24} className="bg-white border rounded-md"/>
                </Link>
                </div>

            {/*RESPONSIVE MENU*/}
            <div className="md:hidden">

                {/* MENU BUTTON */}
                <button className="w-10 h-8 flex flex-col justify-between z-50 relative" onClick={(()=>setOpen(prev=>!prev))}>
                    <motion.div variants={topVariants} animate={open ? "opened" : "closed"} className="w-10 h-1 bg-white rounded origin-left"></motion.div>
                    <motion.div variants={centerVariants} animate={open ? "opened" : "closed"} className="w-10 h-1 bg-white rounded"></motion.div>
                    <motion.div variants={BottomVariants} animate={open ? "opened" : "closed"} className="w-10 h-1 bg-white rounded origin-left"></motion.div>
                </button>

                {/* MENU LIST */}
                {open && (
                    <motion.div variants={listVariants} initial="closed" animate="opened" className="absolute top-0 left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center gap-8 text-4xl z-40">
                    {links.map(link=>(
                        <Link href={link.url} key={link.title}>{link.title}</Link>
                        ))}
                </motion.div>
                )}
            </div>
        </div>
    )
}

export default Navbar