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
  const { shows, loading, getSeasons, episodesBySeason, getEpisodes } =
    useAppContext();
  const [textLarge, setTextLarge] = useState(false);
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
  // LE agregue que la funcion getSeasons devuelva con un return...
  // de esa manera esperamos que tenga todas las temporadas y recien se la manda a GetEpisodes
  useEffect(() => {
    async function fetchSeasonsAndEpisodes() {
      const fetchedSeason = await getSeasons(show.id);
      await getEpisodes(fetchedSeason);
    }
    fetchSeasonsAndEpisodes();
  }, [show.id, getSeasons, getEpisodes]);

  return (
    <div className="relative">
      <Navbar btnBack />
      {/* Hero */}
      <section className="w-full h-screen bg-red-200 relative">
        <div className="">
          {!loading ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={5}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              navigation={false}
              modules={[Pagination, Autoplay]}
              className="mySwiper"
            >
              {episodesBySeason[0] &&
                episodesBySeason[0].map((actualShow, index) => {
                  return (
                    <SwiperSlide key={index}>
                      {/* <ShowCard actualShow={actualShow} /> */}

                      <Image
                        src={actualShow.image?.original}
                        width={680}
                        height={1000}
                        alt={actualShow.name}
                        className="w-full h-screen object-cover"
                      />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          ) : (
            <div> CARGANDO....</div>
          )}
          <div className="bg-slate-800/50 absolute top-0 w-full h-screen z-10"></div>
        </div>

        <div className="absolute bottom-20 left-20 z-20 text-4xl">
          <h2>{show.name}</h2>
        </div>
      </section>
      {/* Summary */}
      <section className="w-full h-full ">
        <div
          className={`relative w-[85%] mx-auto text-center h-${
            textLarge ? "full" : "[25vh] "
          } overflow-hidden  mt-8  py-10 px-8  `}
        >
          <h2 className="text-3xl mb-8 uppercase font-bold ">Summary</h2>
          <div
            dangerouslySetInnerHTML={{ __html: show.summary }}
            className=" "
          ></div>

          <p>Termino en : {show.ended}</p>
          {!textLarge && (
            <div className="bg-gradient-to-t from-black to-blue-500/5 from-10% to-20% h-[25vh] absolute bottom-0 right-0 left-0 w-full"></div>
          )}
        </div>
        <div className="flex items-center text-center justify-center">
        <button onClick={() => setTextLarge(!textLarge)}>Ver Mas...</button>
        </div>
        
      </section>
      {/* Filtros */}
      <section>
        <h3 className="mx-3 mt-8 text-3xl">Podría Interesarte</h3>

        <section>
          {/* {!loading && ( */}
          <div className="pl-4 pr-4 py-4">
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
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
                    <SwiperSlide key={index}>
                      <ShowCard actualShow={actualShow} />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
          
          {episodesBySeason.map((seasonEpisodes, index) => (
            <div key={index} className="pl-4 pr-4 py-4">
              <h3 className="mx-3 mt-8 mb-8 text-3xl">Temporada {index + 1}</h3>
              <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={4}
                navigation
               
              >
                {seasonEpisodes.map((episode) => (
                  <SwiperSlide key={episode.id}>
                    <div>
                      <h4>{episode.name}</h4>
                      <img src={episode.image?.medium} alt={episode.name} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}

        </section>
      </section>
    </div>
  );
};


export default ShowSingleCard;

