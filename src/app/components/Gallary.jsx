"use client"
import React,{useEffect, useRef, useState} from 'react'
import Image from "next/image";
import { useTransform, useScroll, motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis'

const images = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg"
]

const Gallary = () => {

    const gallery = useRef(null);
    const [dimension, setDimension] = useState({width:0, height:0});

    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ['start end', 'end start']
      })

    const { height } = dimension;

    const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

    useEffect( () => {
        const lenis = new Lenis()

        const raf = (time) => {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        const resize = () => {
            setDimension({width: window.innerWidth, height: window.innerHeight})
          }
          
          window.addEventListener("resize", resize)
          requestAnimationFrame(raf);
          resize();

          return () => {
            window.removeEventListener("resize", resize);
          }
      }, [])

  return (
    <section>
        <div className='h-screen'></div>
        <div ref={gallery} className='h-[175vh] overflow-hidden bg-gray-100'>
            <div className='relative top-[-12.5vh] h-[200vh] flex gap-[2vw] p-[2vw]'>
            <Column 
            images={[images[0], images[1], images[2]]} y={y} 
            />
            <Column 
            images={[images[3], images[4], images[5]]} y={y2} 
            />
            <Column 
            images={[images[6], images[7], images[8]]} y={y3}
            />
            <Column 
            images={[images[9], images[10], images[11]]} y={y4} 
            />
            </div>
        </div>
        <div className='h-screen'></div>
    </section>
  )
}

export default Gallary

const Column = ({images, y}) => {
    return(
        <motion.div className='relative h-full w-1/4 min-w-[250px] flex flex-col gap-[2vw] whitespace-nowrap column' style={{y}}>
            {
                images.map((src, i) => {
                    return <div className='h-1/3 w-full relative' key={i}>
                        <Image
                            className='object-cover rounded-lg'
                            src={`/images/${src}`}
                            alt='image'
                            fill
                        />
                    </div>
                })
            }
        </motion.div>
    )
}