import ShowCard from "@/components/ShowCard";
import { useAppContext } from "@/contexts/AppContext";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Carrousel } from "@/components/Carrousel";

const CardsContainer = () => {
  const { shows, loading } = useAppContext();

  const [showsDrama, setShowsDrama] = useState([]);
  const [shows2023, setShows2023] = useState([]);
  const [showsMax2010, setShowsMax2010] = useState([]);

  useEffect(() => {
    const resultFilter = shows.filter((el) => el.genres.includes("Thriller"));
    //show es showSeleccionado, show.genres mis generes seleccionados, .every todos mis generos tienen que cumplir ( => )
    const shows2023Filter = shows.filter((shw) => shw.ended?.includes("2023"));
    
    const showsMax2010Filter = shows.filter((shw) => {
      if (shw.ended) {
        const year = new Date(shw.ended).getFullYear();

        return year <= 2010;
      } else {
        return false;
      }
    });

    setShowsDrama(resultFilter);
    setShows2023(shows2023Filter);
    setShowsMax2010(showsMax2010Filter);
  }, [shows]);

  return (
    <section>
      <h2>Shows</h2>
      {!loading && (
        <div className="px-2 py-4">
          <Carrousel showsArray={shows} />

          <div>Segundo Carrusel</div>

          <Carrousel showsArray={showsDrama} />
          <div>Tercer Carrusel</div>
          <Carrousel showsArray={shows2023} />
          <div>Cuarto Carrusel max 2010</div>
          <Carrousel showsArray={showsMax2010} />
        </div>
      )}
      {loading && <p>Loading...</p>}
    </section>
  );
};

export default CardsContainer;