import Image from "next/image";
import React from "react";
import Navbar from "@/components/Navbar";
import { AiFillGithub } from "react-icons/ai";
import { AiFillBehanceCircle } from "react-icons/ai";

function AboutContainer() {
  return (
    <div>
    <Navbar btnBack />
    <div className="pt-[10vh] flex p-6 space-x-6 items-center px-20  bg-gradient-to-b from-green-400 to-blue-700 h-[90vh]">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Explora, Descubre y Disfruta:</h2>
        <p>
        Esta plataforma de series te invita a explorar el vasto mundo de la televisión de una manera conveniente y eficiente. Ya sea que estés buscando tus series favoritas, quieras descubrir nuevas joyas televisivas o simplemente desees mantenerte actualizado con las últimas tendencias, estamos aquí para brindarte una experiencia sin complicaciones y gratificante.
        </p>
        <h2 className="text-2xl font-bold mt-6 mb-4">¿Quién soy?</h2>
        <p>
        Soy Victoria, estudiante de tercer año en la Licenciatura en Tecnología Multimedial. Mi portafolio incluye trabajos creativos y funcionales que reflejan mi dedicación a la tecnología multimedia. He utilizado mis habilidades para desarrollar proyectos de diseño gráfico, animaciones, desarrollo web y mucho más.

En este espacio, encontrarás enlaces a mis trabajos y proyectos anteriores, así como a mi portafolio en línea. Te invito a explorarlos y a conocer mi enfoque en la tecnología multimedia y la creatividad. 
        </p>
        
      </div>
      <div className="flex-1 flex justify-center items-center ">
      <div className=" flex justify-center gap-8 p-6">
          <a href="https://github.com/vicocongui/maimo-next-boilerplate-2023" target="_blank" className=" px-4 py-2 rounded-full"> <AiFillGithub size='5em'/></a>
          <a href="https://www.behance.net/victoriafranco6" target="_blank" className=" px-4 py-2 rounded-full"> <AiFillBehanceCircle size='5em'/></a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AboutContainer;