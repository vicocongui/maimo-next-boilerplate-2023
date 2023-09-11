import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAppContext } from "@/contexts/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ShowCard from "./ShowCard";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const ShowSingleCard = ({ show }) => {
  const { shows, loading } = useAppContext();

  const [showsFiltrados, setShowFiltrados] = useState([]);
  console.log(show.genres, "Show Seleccionado");

  function generosCoincidentes(show, showSeleccionado) {
    return showSeleccionado.genres.filter((gen) => show.genres.includes(gen))
      .length;
  }
  useEffect(() => {
    const resultFilter = shows.filter(
      (el) => show.genres.every((genero) => el.genres.includes(genero))
      //show es showSeleccionado, show.genres mis generes seleccionados, .every todos mis generos tienen que cumplir ( => )
    );
    if (resultFilter.length < 2) {
      const resultFilter2genres = shows.filter(
        (serie) => generosCoincidentes(serie, show) >= 2
      );

      console.log(resultFilter2genres, "2gen result filter");
      setShowFiltrados(
        resultFilter2genres.filter((serie) => serie.id != show.id)
      );
      return;
    }

    console.log(resultFilter, "Result Filter");
    setShowFiltrados(resultFilter);
  }, [shows]);

  return (
    <div className="relative">
      <Navbar />
      {/* Hero */}
      <section className="w-full h-screen bg-red-200 relative">
        <div className="">
          {show.image && (
            <Image
              src={show.image?.original}
              width={680}
              height={1000}
              alt={show.name}
              className="w-full h-screen object-cover"
            />
          )}
          <div className="bg-slate-800/50 absolute top-0 w-full h-screen z-10"></div>
        </div>

        <div className="absolute bottom-20 left-20 z-20 text-4xl">
          <h2>{show.name}</h2>
          <p>Descrip | 12 | 2312</p>
        </div>
      </section>
      {/* Summary */}
      <section className="w-full h-[40vh]">
        <div className="w-[85%] mx-auto text-center h-full py-10 px-8">
          <h2 className="text-3xl mb-8 uppercase font-bold">Summary</h2>
          <p>
            {show.summary}
          </p>
        </div>
      </section>
      {/* Filtros */}
      <section>
        <h3>Estos títulos podrían interesarte</h3>

        <section>
          <h2>Shows</h2>
          {/* {!loading && ( */}
          <div className="px-2 py-4">
            <Swiper
              slidesPerView={5}
              spaceBetween={25}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={true}
              modules={[Pagination, Navigation, Autoplay]}
              className="mySwiper"
            >
              {showsFiltrados.length > 0 &&
                showsFiltrados.map((actualShow, index) => {
                  return (
                    <SwiperSlide>
                      <ShowCard actualShow={actualShow} key={index} />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </section>
      </section>
    </div>
  );
};

export default ShowSingleCard;
