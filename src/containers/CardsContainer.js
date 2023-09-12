import ShowCard from "@/components/ShowCard";
import { useAppContext } from "@/contexts/AppContext";
import { useEffect, useState } from "react";
import Carrousel from "@/components/Carrousel";


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const CardsContainer = () => {
  const { shows, loading } = useAppContext();

  const [showDrama, setShowDrama] = useState([]);
  const [showFiltroAnio, setShowFiltroAnio] = useState([]);
  const [showFiltroMax2010, setShowFiltroMax2010] = useState([]);

  useEffect(() => {
    /*Drama*/
    const showDrama = shows.filter((el) => el.genres.includes("Drama"));
    /*ended 2010*/
    setShowFiltroMax2010(
      shows.filter((shw)=>{
        if(shw.ended){
          const anios = new Date(shw.ended).getFullYear();
          return   anios <=2010;
        }
        else false
      })
    )
    /*año premiered*/
    setShowFiltroAnio(
      shows.filter((el)=>{
        if(el.premiered){
          const anio = new Date(el.premiered).getFullYear();
          return  anio >= 2003
        }
        else false
      })
    )

    setShowDrama(showDrama);

  }, [shows])
  

  return (
    <section>
      <h2>Shows</h2>
      {!loading && (
        <div className="px-2 py-4">
          <Carrousel showsArray={shows} />

          <div>Segundo Carrusel</div>

          <Carrousel showsArray={showDrama} />
          <div>Tercer Carrusel</div>
          <Carrousel showsArray={showFiltroMax2010} />
          <div>Cuarto Carrusel max 2010</div>
          <Carrousel showsArray={showFiltroAnio} />
        </div>
      )}
      {loading && <p>Loading...</p>}
    </section>
  );
};

export default CardsContainer;